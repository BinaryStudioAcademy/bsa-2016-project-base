import React from "react"
import {PropTypes} from "react"
import searchService from "./../../../services/SearchService"
import ListProjects from "./../../home/components/ListProjects"


export default class View extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    static get propTypes() {
        return {
            project: PropTypes.object.isRequired
        }
    }

    getPrompt(pattern, current){//projects
        var tags = pattern.tags.filter(t=>
            current.tags.filter(_t=>
                _t.tagName == t.tagName
            ).length)
            .map((t,i)=>
                <span key={i} style={{margin:"3px"}}>
                    <span className="tech-name" >{t.tagName}</span>
                </span>
            );
        //for more criteria should use loop
        var techs = pattern.technologies.filter(t=>
                current.technologies.filter(_t=>
                    _t.techName == t.techName
                ).length)
            .map((t,i)=>
                <span key={i} style={{margin:"3px", display:"flex", flexDirection:"row"}}>
                    <span className="tech-name" >{t.techName}</span>
                    <span className="label-version">{t.techVersion}</span>
                </span>
            );
        return <div>
            {tags.length?<h3>Similar tags: </h3>:""}
            {tags.length?<span className="labels" style={{display:"flex"}}>{tags}</span>:""}
            {techs.length?<h3>Similar technologies: </h3>:""}
            {techs.length?<span className="labels" style={{display:"flex"}}>{techs}</span>:""}
        </div>
    }
    loadProjects(props) {
        var {project} = props || this.props;
        var projectId = project._id;
        if (!this.currentProjectId || this.currentProjectId != projectId) {
            this.currentProjectId = projectId;
            var techs = project.technologies.map(t=>encodeURIComponent(t.techName));
            //for more criteria should use loop
            var tags = project.tags.map(t=>encodeURIComponent(t.tagName));
            var self = this;
            var techVars = techs.map((t, i)=>"tech" + i);
            var tagVars = tags.map((t, i)=>"tag" + i);
            var _predicate = techVars.concat(tagVars);
            var predicate = encodeURIComponent(_predicate.slice(0, _predicate.length > 8 ? 8 : _predicate.length).join("|"));
            predicate = `!id0&(${predicate})`;
            searchService.getProjects(`skip=0&limit=3&${techs.length?"techs="+techs.join(","):""}&${tags.length?"tags="+tags.join(","):""}&id=${project._id}&predicate=${predicate}`)
                .then(data=> {
                    self.setState({
                        error: data.err && data.err.message,
                        projects: data.projects.map(p=>({
                            prompt: self.getPrompt(project,p),
                            data: p
                        }))
                    })
                })
        }
    }

    componentWillReceiveProps(props) {
        this.loadProjects(props);
    }


    render() {
        var {project} = this.props;
        if (project.isLoading !== false)return null;
        var {projects, error} = this.state;
        if (!projects) {
            this.loadProjects();
            return null;
        }
        var projectsComponent = <ListProjects projects={projects.map(p=>p.data)}/>

        var projectsPrompts = error ? error :
            projects.map((p, i)=>
                <span style={{width:`${80/2.96}%`,margin:"1.5%"}} key={i}>{p.prompt}</span>)


        return (
            <div>
                <div  style={{display:"flex",justifyContent:"center"}}><h1>Related Projects</h1></div>
                <div>
                    {projectsComponent}
                </div>
                <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"space-between", width:"100%"}}>
                    {projectsPrompts}
                </div>
            </div>

        )
    }
}