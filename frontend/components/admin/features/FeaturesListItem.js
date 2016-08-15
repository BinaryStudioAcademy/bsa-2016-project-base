import React, { Component, PropTypes } from 'react';
import {FormControl, Row, Col, Modal, Button, ButtonToolbar} from 'react-bootstrap';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/Features.sass';

import * as actions from '../../../actions/admin/FeaturesActions'

class FeaturesListItem extends Component {
    constructor(props) {
        super(props);
        this.changeCheckedFeature = this.changeCheckedFeature.bind(this);


    }

    changeCheckedFeature(e) {
        if(e.target.checked) {
           this.props.addCheckedFeature(this.props.featuresData.listCheckedFeatures, this.props.feature._id)
        }
        else if(!e.target.checked) {
            this.props.removeCheckedFeature(this.props.featuresData.listCheckedFeatures, this.props.feature._id)
        }
    }


    render() {
        return (

            <Row className="FeatureListItem">
                <Col  xs={5} sm={5}>
                    <div className={styles['list-item-navigation']}>
                        <div>
                            <FormControl type="checkbox" className={styles['select-checkbox']}
                                 name="checkbox" id={this.props.feature._id} /*checked={item['checked']}*/
                                 onChange={this.changeCheckedFeature} checked={this.props.check}
                            />
                            <label htmlFor={this.props.feature._id} className={styles['select-label']}>
                                Name: {this.props.feature.featureName}
                            </label>
                        </div>
                        <div>
                            <span>Section: </span>
                            <span>{this.props.feature.section.name}</span>
                        </div>
                    </div>
                </Col>
                <Col  xs={5} sm={5}>{this.props.feature.featureDescription.lists}</Col>
                <Col  xs={2} sm={2}>
                    <ButtonToolbar className="listItemButtonToolbar">
                    <Button onClick={() => this.props.openFeatureDetails(this.props.feature)} block className="bShowFeatureDetails">Show</Button>
                    <Button onClick={() => this.props.open(this.props.feature)} block>Edit</Button>
                        </ButtonToolbar>
                </Col>
            </Row>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        featuresData: state.FeaturesReducer
    };
}
const FeaturesListItemConnected = connect(mapStateToProps, mapDispatchToProps)(FeaturesListItem);
export default FeaturesListItemConnected;