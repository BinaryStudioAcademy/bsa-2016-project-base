import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Project from './Project';

export default class ListProjects extends Component {

    static propTypes = {
        projects: React.PropTypes.array.isRequired
    };

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <ListGroup>
                    {projects.map( project =>
                        <Project
                            key={project._id}
                            data-id={project._id}
                            project={project}/>
                    )}
                </ListGroup> : null
        )
    }
}