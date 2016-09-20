import React, { Component } from 'react';
import Project from './Project';

import styles from './ListProjects.sass';

export default class ListProjects extends Component {

    static propTypes = {
        projects: React.PropTypes.array.isRequired
    };

    ranking(rating) {
        let ranking = 0,
            length = rating.length;

        for(let i = 0; i < length; i++){
            ranking += rating[i].value;
        }

        if (!length) return 0;
        return Math.round(ranking/length);
    }

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <ul className={styles["project-list-home"]}>
                    {projects.map( (project, index) =>
                        <div>
                            <Project
                                id={project._id}
                                key={index}
                                data-id={project._id}
                                project={project}
                                ranking={this.ranking(project.rating)}/>
                        </div>
                    )}
                </ul> : null
        )
    }
}