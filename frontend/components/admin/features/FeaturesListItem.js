import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, ButtonToolbar} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/Features.sass';

import * as actions from '../../../actions/admin/FeaturesActions'

class FeaturesListItem extends Component {
    constructor(props) {
        super(props);
        this.handlerChangeCheckedFeature = this.handlerChangeCheckedFeature.bind(this);
    }

    handlerChangeCheckedFeature(e) {
        this.refs.selectCheckbox.checked = !this.refs.selectCheckbox.checked
        this.props.changeCheckedFeature(this.refs.selectCheckbox.checked, this.props.feature._id, this.props.featuresData.features.length);
    }

    render() {
        return (
            <Row className="FeatureListItem">
                <Col  xs={3} sm={3}>
                    <div className={styles['list-item-navigation']}>
                        <div className="nameFeatureCheckbox">
                            <input type="checkbox" className={styles['select-checkbox'] + ' ' + "form-control"} ref="selectCheckbox"
                                 name="checkbox" id={this.props.feature._id} /*checked={item['checked']}*/
                                  checked={this.props.check}
                            />
                            <span htmlFor={this.props.feature._id} ref="selectLabel" onClick={this.handlerChangeCheckedFeature} className={styles['select-label']}>
                                Name: {this.props.feature.featureName}
                            </span>
                        </div>
                        <div>
                            <span>Section: </span>
                            <span>{this.props.feature.section.name}</span>
                        </div>
                    </div>
                </Col>
                <Col  xs={6} sm={6}>
                    <span className="shortDescriptionFeature">{this.props.feature.descriptionText}</span>
                    </Col>
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