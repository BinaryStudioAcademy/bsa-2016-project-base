import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './Project'

export default class Project extends Component {

    static propTypes = {
        project: React.PropTypes.object.isRequired
    };
    
    render() {

        const { project } = this.props;

        return (
            <Col xs={12}>
                <Row>
                    <Col xs={8}>
                        {project.projectName}
                    </Col>
                    <Col xs={4}>
                        Technologies:
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        {project.description[0].descrText}
                    </Col>
                    <Col xs={4}>
                        lalala
                        lalala
                        lalala
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} sm={1}>
                        End dates:
                    </Col>
                    <Col xs={8} sm={4}>
                        {project.timeEnd.split('T')[0]}
                    </Col>
                </Row>
            </Col>
        )
    }
}