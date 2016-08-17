import React, { Component, PropTypes } from 'react';
import {Modal, Button, FormGroup, FormControl, Col, Form, ControlLabel}  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeaturesListItem from './FeaturesListItem';
import styles from './styles/Features.sass';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import * as actionsFeature from '../../../actions/admin/FeaturesActions'

class FeaturesList extends  Component {
    constructor(props) {
        super(props);
        this.checkSearchInNames = this.checkSearchInNames.bind(this);
        this.checkSelectedSections = this.checkSelectedSections.bind(this);
        this.checkSearchInDescriptions = this.checkSearchInDescriptions.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.closeEditFeature = this.closeEditFeature.bind(this);
        this.openEditFeature = this.openEditFeature.bind(this);
        this.saveNameFeature = this.saveNameFeature.bind(this);
        this.saveDescriptionText  = this.saveDescriptionText.bind(this);
        this.saveDescriptionHTMLText = this.saveDescriptionHTMLText.bind(this);
        this.saveSelectedSection = this.saveSelectedSection.bind(this);
        this.addFeature = this.addFeature.bind(this);
        this.closeFeatureDetails = this.closeFeatureDetails.bind(this);
        this.openFeatureDetails = this.openFeatureDetails.bind(this);
        this.state = {
            showEditFeatureModal: false,
            showFeatureDetailsModal: false,
            featureName: '',
            descriptionText: '',
            descriptionHTMLText: '',
            section: "",
            index: '',
            editFeature: null
        }
    }

    checkSearchInNames(nameFeature, nameSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(nameFeature.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
            nameSection.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            return true
        }
    }

    checkSelectedSections(listCheckedSections, section) {
        if(listCheckedSections.length == 0 || listCheckedSections.indexOf(section) != -1) {
            return true;
        }
    }

    checkSearchInDescriptions(descriptionFeature, descriptionSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(descriptionFeature.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
            descriptionSection.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            return true
        }
    }

    checkValue(nameFeature, nameSection, descriptionFeature, descriptionSection, listCheckedSections, section, filter) {
        if(this.checkSelectedSections(listCheckedSections, section) &&
            (this.checkSearchInNames(nameFeature, nameSection, filter) ||
            this.checkSearchInDescriptions(descriptionFeature, descriptionSection, filter))) {
            return true
        }
    }

    closeEditFeature() {
        this.setState({
            showEditFeatureModal: false
        })
    }

    openEditFeature(editFeature) {
        const {features} = this.props.featuresData;
        this.setState({
            showEditFeatureModal: true,
            featureName: editFeature.featureName,
            descriptionText: editFeature.descriptionText,
            descriptionHTMLText: editFeature.descriptionHTMLText,
            section: editFeature.section._id,
            index: features.indexOf(editFeature),
            editFeature: editFeature
        })
    }

    saveNameFeature(e) {
        this.setState({featureName: e.target.value});
    }

    saveDescriptionText(e) {
        this.setState({descriptionText: e.target.value});
    }

    saveDescriptionHTMLText(e) {
        this.setState({descriptionHTMLText: e.target.value});
    }


    saveSelectedSection(e) {
        this.setState({section: e.target.value});
    }

    addFeature(e) {
        e.preventDefault();
        let self = this;
        let searchSameFeature = this.props.featuresData.features.filter(function(el) {
            if(el.featureName == self.state.featureName && el._id != self.state.editFeature._id) {
                console.log("Error! Feature with same name already exist in base");
                return true;
            }
            else {
                return false
            }
        });

        if(this.state.featureName.replace(/\s/g, '') == '' ||
            this.state.descriptionText.replace(/\s/g, '') == '' ||
            !this.state.section || this.state.section == "Select section"){
            console.log("Please, input all required fields");
            e.preventDefault();
            return;
        }

        if(searchSameFeature.length >=1) {
            return;
        }
        const {features} = this.props.featuresData;
        this.props.editFeature(features, Object.assign({}, this.state.editFeature, {featureName: this.state.featureName},
            {descriptionText: this.state.descriptionText},
            {descriptionHTMLText: this.state.descriptionHTMLText},
            {section: this.state.section}), this.state.index);
        this.closeEditFeature();
    }

    closeFeatureDetails() {
        this.setState({
            showFeatureDetailsModal: false
        });
        return false;
    }

    openFeatureDetails(feature) {
        this.setState({
            showFeatureDetailsModal: true,
            featureName: feature.featureName,
            descriptionText: feature.descriptionText,
            descriptionHTMLText: feature.descriptionHTMLText,
            section: feature.section,
        });
        return true;
    }

    render() {
        const {features,filter} = this.props.featuresData;
        var self = this;
        return (
            <div className={styles['list-container']} id="list-container">
                <Modal show={this.state.showFeatureDetailsModal} className="modal modalShowFeatureDetails" bsSize="large" onHide={this.closeFeatureDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Feature details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal className={styles['form']}>
                            <FormGroup>
                                <Col sm={3} >
                                    <ControlLabel >Name of feature:</ControlLabel>
                                </Col>
                                <Col sm={8} >
                                    <span ref="featureNameModalDetails" className="featureNameModalDetails" id="featureNameModalDetails">{this.state.featureName}</span>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3} >
                                    <ControlLabel >Section:</ControlLabel>
                                </Col>
                                <Col sm={8} >
                                    <span ref="featureNameModalDetails" className="featureNameModalDetails" id="featureNameModalDetails">{this.state.section.name}</span>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Short description:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <span>{this.state.descriptionText}</span>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Full description:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <span>{this.state.descriptionHTMLText}</span>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEditFeatureModal} className="modal modalEditFeature" id="modalEditFeature"  onHide={this.closeEditFeature}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit feature</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal className={styles['form']}>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel >Name of feature(*):</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <input
                                        defaultValue={this.state.featureName}
                                        className="form-control"
                                        id="nameFeatureModal"
                                        type="text"
                                        onBlur={this.saveNameFeature}
                                        placeholder="Enter the name of feature"
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel >Select section(*):</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <FormControl componentClass="select"  className={styles['text-select-input']} id="selectSectionModal"
                                                 onChange={this.saveSelectedSection}   required>
                                        <option key={0} value="Select section" >Select section</option>
                                        {

                                            this.props.sectionsData.sections.map(function(el, index) {
                                                if(el._id == self.state.section) {
                                                    return (
                                                        <option key={index} value={el._id} selected >{el.name}</option>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <option key={index} value={el._id} >{el.name}</option>
                                                    )
                                                }

                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Short description(*):</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <textarea
                                        id="shortDescriptionFeatureModal"
                                        onBlur={this.saveDescriptionText}
                                        className="form-control"
                                        placeholder="Enter the description"
                                        defaultValue={this.state.descriptionText}
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Full description:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <textarea
                                        id="fullDescriptionFeatureModal"
                                        onBlur={this.saveDescriptionHTMLText}
                                        className="form-control"
                                        placeholder="Enter the description"
                                        defaultValue={this.state.descriptionHTMLText}
                                    />
                                </Col>
                            </FormGroup>

                            <Col sm={6} smPush={3}>
                                <Button type="submit"  onClick={this.addFeature} block id="addFeature">Save changed</Button>
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                {
                    features.map(function(feature) {
                        var check = false;
                        if(self.checkValue(feature.featureName, feature.section.name,
                                feature.descriptionText, feature.section.description,
                                self.props.featuresData.listCheckedSections, feature.section._id, filter)) {
                            if(self.props.featuresData.listCheckedFeatures.indexOf(feature._id) != -1 || self.props.featuresData.allChecked) {
                                check = true;
                            }
                            else {
                                check = false;
                            }
                            return (
                                <FeaturesListItem open={self.openEditFeature} openFeatureDetails={self.openFeatureDetails} handlerEditFeature={self.handlerEditFeature} check={check} feature={feature} key={feature._id}/>
                            )
                        }
                    })}
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...actionsSection,
        ...actionsFeature}, dispatch);
}

function mapStateToProps(state) {
    return {
        sectionsData: state.SectionsReducer,
        featuresData: state.FeaturesReducer,
    };
}
const FeaturesListConnected = connect(mapStateToProps, mapDispatchToProps)(FeaturesList);
export default FeaturesListConnected;