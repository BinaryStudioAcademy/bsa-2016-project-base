import React from "react";
import {PropTypes} from "react";
import {Link} from 'react-router';
import styles from "../project-view.sass";
import searchService from "./../../../services/SearchService";

export default class View extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dateOptions: {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        };
    }

    componentWillReceiveProps(props){
        //update component when parent changed
        this.loadProjects(props);
    }

    loadProjects(props) {
        //props can by "nextProps"
        //when project view changes this component should update too
        const project = (props || this.props)['project'];
        if(!project) return;
        if(!project['technologies'] || !project['tags']) return;
        let techs = project['technologies'].map(item => encodeURIComponent(item.techName)),
            tags = project['tags'].map(item => encodeURIComponent(item.tagName));

        //predicate allows to get projects than have at least one of this project's tags or technologies
        //and not to add ro related projects this project itself
        //make predicate
        var techVars = techs.map((t, i)=>`tech${i}`);
        var tagVars = tags.map((t, i)=>`tag${i}`);
        var predicate = `!location0`;
        function addTechs(){
            predicate += techVars.join("|");
            predicate += ")"
        }
        if (tagVars.length){
            predicate+="(";
            predicate+=tagVars.join("|");
            if (techVars.length){
                addTechs();
                predicate += "|"
            }
        }else if (techVars.length){
            predicate += "(";
            addTechs()
        }
        //end make predicate


        predicate = encodeURIComponent(predicate)
        ///////////////////
        searchService.getProjects(`skip=0%limit=3&id=${project._id}&${techs.length?"&techs="+techs.join(","):""}${tags.length?"&tags="+tags.join(","):""}&predicate=${predicate}`)
            .then(data=> {
                let projects = new Array();
                data['projects'].forEach((similarProject)=>{
                        if(similarProject._id == project._id) return;
                        var result = {
                            _id: similarProject['_id'],
                            dates: {
                                begin: similarProject['timeBegin'],
                                end: similarProject['timeEnd']
                            },
                            tags:[],
                            technologies:[],
                            name: similarProject['projectName'],
                            status: similarProject['status']
                        };

                        if(similarProject['tags']) project['tags'].forEach(
                        (tagItem)=>{
                            let item = similarProject['tags'].find(similagTagItem =>
                                (tagItem.tagName == similagTagItem.tagName));
                            if(item) result['tags'].push(item);
                        });
                        
                        if(similarProject['technologies']) project['technologies'].forEach(
                        (techItem)=>{
                            let item = similarProject['technologies'].find(similarTechItem =>
                                (techItem.techName == similarTechItem .techName));
                            if(item) result['technologies'].push(item);
                        });
                        projects.push(result);
                    })
                this.setState({
                    error: data['err'] && data['err'].message,
                    projects: projects 
                });

            });
    }

    render() {
        if(!this.state.projects || this.state['error']){
            this.loadProjects();
            return null;
        }
        const projects = this.state['projects'];
        var projectItems = new Array();
        if(projects) projects.forEach((projectItem)=>{
            let flag = (projectItem['status'] ? (projectItem['status'].toLowerCase() == "completed") : false),
                technologyItems = [], tagsItems = [];
            if(projectItem.tags) projectItem['tags'].forEach((tagItem)=>{
                tagsItems.push(<span>#{tagItem.tagName}</span>);
            }); 
            if(projectItem.technologies) projectItem['technologies'].forEach((techItem)=>{
                technologyItems.push(<span>{techItem.techName}<i>{techItem.techVersion + ".0"}</i></span>);
            });   
            projectItems.push(<div key={projectItem._id}>
                <Link to={'/project-view/' + projectItem._id}>{projectItem['name']}</Link>
                <div className={styles[(flag ? "projectStatus-Completed" : "projectStatus-Ignored")]}>
                    <label>{projectItem['status']}</label>
                </div>
                <div className={styles['project-DateBlock']}>
                    <span>Start date:</span>
                    <span className={styles['project-dateBegin']}>
                        {(new Date(projectItem['dates'].begin).toLocaleString("en-US",this.state['dateOptions']))}
                    </span>
                    <br/>
                    <span>End date:</span>
                    <span className={styles['project-dateEnd']}>{(!projectItem['dates'].end) ?
                         "Project in progress" :
                        (new Date(projectItem['dates'].end).toLocaleString("en-US",this.state['dateOptions']))
                    }</span>
                </div>
                <div className={styles["project-similarTags"]}>{tagsItems}</div>
                <div className={styles["project-similarTechnologies"]}>{technologyItems}</div>
            </div>);
        });
        return (
            <div className={styles['projectMain-SimilarProjects']}>
                <header className={styles['similarProjects-Header']}>
                    <h2>Related Projects</h2>
                </header>
                <div className={styles["similarProjects-List"]}>{projectItems}</div>
            </div> 
        )
    }
}