import React, { Component, PropTypes } from 'react';
import { Col, Tabs, Tab } from 'react-bootstrap';
import InsertFeature from './InsertFeature';
import InsertSection from './InsertSection';
import styles from './styles/Features.sass';

export default class InsertTabs extends Component {
    render() {
        return (
            <Col sm={10} smPush={1}>
                <Tabs defaultActiveKey={1} animation={false} id="addTabs" className={styles['feature-tabs']}>
                    <Tab eventKey={1} title="Add section">
                        <InsertSection />
                    </Tab>
                    <Tab eventKey={2} title="Add feature">
                        <InsertFeature />
                    </Tab>
                </Tabs>
            </Col>
        )
    }
}
