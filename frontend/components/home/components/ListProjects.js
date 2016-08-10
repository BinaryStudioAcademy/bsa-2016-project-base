import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Project from './Project';

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

        return (ranking/length).toFixed(1);
    }

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <ListGroup>
                    {projects.map( project =>
                        <Project
                            key={project._id}
                            data-id={project._id}
                            project={project}
                            ranking={this.ranking(project.rating)}/>
                    )}
                </ListGroup> : null
        )
    }
}