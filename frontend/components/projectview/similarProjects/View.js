import React from "react";
import {PropTypes} from "react";
import styles from "../project-view.sass";
import searchService from "./../../../services/SearchService";
import ListProjects from "./../../home/components/ListProjects";

export default class View extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
    }
    loadProjects(props) {
        const project = this.props['project'];
        if(!project['technologies'] || !project['tags']) return;
        let techs = project['technologies'].map(item => encodeURIComponent(item.techName)),
            tags = project['tags'].map(item => encodeURIComponent(item.tagName));

        searchService.getProjects(`skip=0&${techs.length?"techs="+techs.join(","):""}&${tags.length?"tags="+tags.join(","):""}&id=${project._id}`)
            .then(data=> {
                this.setState({
                    error: data['err'] && data['err'].message,
                    projects: data['projects'].map((similarProject)=>{

                        var result = {
                            equals:{
                                tags:[],
                                technologies:[]
                            },
                            project: similarProject
                        };

                        if(similarProject['tags']) project['tags']
                            .forEach((tagItem)=>{
                                let item = similarProject['tags'].find(similagTagItem =>
                                    (tagItem.tagName == similagTagItem.tagName));
                                if(item) result.equals['tags'].push(item);
                            });
                        
                        if(similarProject['technologies']) project['technologies']
                            .forEach((techItem)=>{
                                let item = similarProject['technologies'].find(similarTechItem =>
                                    (techItem.techName == similarTechItem .techName));
                                if(item) result.equals['technologies'].push(item);
                            });
                        return result;
                    })
                });
            });
    }

    componentWillReceiveProps(props) {
        this.loadProjects(props);
    }

    render() {
        return (
            <div />
        )
    }
}