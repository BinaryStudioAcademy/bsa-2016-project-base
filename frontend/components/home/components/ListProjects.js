import React, { Component } from 'react';
import { Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import Project from './Project';

import styles from './ListProjects';

export default class ListProjects extends Component {

    static propTypes = {
        projects: React.PropTypes.array.isRequired
    };

    render() {
        const { projects } = this.props;

        return (
                (projects.length > 0) ?
                <ListGroup componentClass="ul">
                    {projects.map( project =>
                        <Project
                            key={project._id}
                            data-id={project._id}
                            project={project}
                            className={styles.border} />
                    )}
                </ListGroup> : null
        )
    }
}