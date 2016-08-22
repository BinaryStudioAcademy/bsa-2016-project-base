import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
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

        if (!length) '0.0';
        return (ranking/length).toFixed(1);
    }

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <div className='row'>
                    {projects.map( project =>
                        <Project
                            key={project._id}
                            data-id={project._id}
                            project={project}
                            ranking={this.ranking(project.rating)}/>
                    )}
                </div> : null
        )
    }
}