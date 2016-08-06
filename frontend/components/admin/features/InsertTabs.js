import React, { Component, PropTypes } from 'react';
import { Col, Tabs, Tab } from 'react-bootstrap';
import InsertFeature from './InsertFeature';
import InsertSection from './InsertSection';
import styles from './styles/Features.sass';

export default class InsertTabs extends Component {
    render() {
        return (
            <Col sm={8} smPush={2}>
                <Tabs defaultActiveKey={1} animation={false} id="addTabs" className={styles['Tabs']}>
                    <Tab eventKey={1} title="Add section" className={styles['text']}>
                        <InsertSection />
                    </Tab>
                    <Tab eventKey={2} title="Add feature" className={styles['text']}>
                        <InsertFeature />
                    </Tab>
                </Tabs>
            </Col>
        )
    }
}
