import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import styles from './GeneralInformation.sass';

export default class GeneralInformation extends Component {

    static propTypes = {
        projects: React.PropTypes.array.isRequired
    };

    render() {
        const cnt = this.props.projects.length;

        return (
            <Col xs={12} className={styles.count}>
                {(cnt)?
                    <p>Found {(cnt > 1)?`${cnt} projects`: `${cnt} project`}</p>:
                    <p>Projects not found</p>
                }
            </Col>
        )
    }
}