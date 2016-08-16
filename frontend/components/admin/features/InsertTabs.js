import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Tabs, Tab } from 'react-bootstrap';
import InsertFeature from './InsertFeature';
import InsertSection from './InsertSection';
import * as actionsFeature from '../../../actions/admin/FeaturesActions'
import styles from './styles/Features.sass';

class InsertTabs extends Component {
    render() {
        return (
            <Col sm={10} smPush={1} className={this.props.visibilityForm}>
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsFeature, dispatch)
}
function mapStateToProps(state) {
    return {
        visibilityForm: state.FeaturesReducer.visibilityForm
    }
}
const InsertTabsConnected = connect(mapStateToProps, mapDispatchToProps)(InsertTabs);
export default InsertTabsConnected;

