import React, { Component, PropTypes } from 'react';
import {Modal, Button, FormGroup, FormControl, Col, Form, ControlLabel}  from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionsListItem from './SectionsListItem';
import styles from './styles/Sections.sass';
import * as actionsSection from "../../../actions/admin/SectionsActions";

class SectionList extends  Component {
    constructor(props) {
        super(props);
        this.checkSearchInNames = this.checkSearchInNames.bind(this);
        this.checkSearchInDescriptions = this.checkSearchInDescriptions.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
        this.openEditSection = this.openEditSection.bind(this);
        this.saveNameSection = this.saveNameSection.bind(this);
        this.saveDescriptionSection = this.saveDescriptionSection.bind(this);
        this.editSection = this.editSection.bind(this);
        this.closeSectionDetails = this.closeSectionDetails.bind(this);
        this.openSectionDetails = this.openSectionDetails.bind(this);
        this.state = {
            showEditSectionModal: false,
            showSectionDetailsModal: false,
            name: '',
            description: '',
            index: '',
            editSection: null,
        }
    }

    componentWillMount () {
        this.props.getAllSections();
    }

    checkSearchInNames(nameSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(nameSection.toLowerCase().indexOf(filter.toLowerCase()) == 0) {
            return true
        }
    }

    checkSearchInDescriptions(descriptionSection, filter) {
        filter = filter.replace(/\s/g, '');
        if(filter == '') {
            return true;
        }
        if(descriptionSection.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            return true
        }
    }

    checkValue(nameSection, descriptionSection, filter) {
        if((this.checkSearchInNames(nameSection, filter) ||
            this.checkSearchInDescriptions(descriptionSection, filter))) {
            return true
        }
    }

    closeEditSection() {
        this.setState({
            showEditSectionModal: false
        })
    }

    openEditSection(editSection) {
        const {sections} = this.props.sectionsData;
        this.setState({
            showEditSectionModal: true,
            name: editSection.name,
            description: editSection.description,
            index: sections.indexOf(editSection),
            editSection: editSection
        })
    }

    saveNameSection(e) {
        this.setState({name: e.target.value});
    }

    saveDescriptionSection(e) {
        this.setState({description: e.target.value});
    }

    editSection(e) {
        e.preventDefault();
        let self = this;
        let searchSameSection = this.props.sectionsData.sections.filter(function(el) {
            if(el.name == self.state.name && el._id != self.state.editSection._id) {
                console.log("Error! Section with same name already exist in base");
                return true;
            }
            else {
                return false
            }
        });

        if(this.state.name.replace(/\s/g, '') == '' ||
            this.state.description.replace(/\s/g, '') == ''){
            console.log("Please, input all field");
            return;
        }

        if(searchSameSection.length >=1) {
            return;
        }
        const {sections} = this.props.sectionsData;
        this.props.editSection(sections, Object.assign({}, this.state.editSection, {name: this.state.name},
            {description: this.state.description}),
            this.state.index);
        this.closeEditSection();
    }

    closeSectionDetails() {
        this.setState({
            showSectionDetailsModal: false
        });
        return false;
    }

    openSectionDetails(section) {
        this.setState({
            showSectionDetailsModal: true,
            name: section.name,
            description: section.description
        });
        return true;
    }

    render() {
        const {sections, filter} = this.props.sectionsData;
        var self = this;
        return (
            <div className={styles['list-container']}>
                <Modal show={this.state.showSectionDetailsModal} className="modal modalShowSectionDetails" bsSize="large" onHide={this.closeSectionDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Section details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal className={styles['form']}>
                            <FormGroup>
                                <Col sm={3} >
                                    <ControlLabel >Name of section:</ControlLabel>
                                </Col>
                                <Col sm={8} >
                                    <span ref="sectionNameModal" className="sectionNameModal" id="sectionNameModal">{this.state.name}</span>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Description:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <span>{this.state.description}</span>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEditSectionModal} className="modal modalEditSection" id="modalEditSection"  onHide={this.closeEditSection}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit section</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal className={styles['form']}>
                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel >Name:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <input
                                        defaultValue={this.state.name}
                                        className="form-control"
                                        id="nameSectionModal"
                                        type="text"
                                        onBlur={this.saveNameSection}
                                        placeholder="Enter the name of section"
                                        required
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <ControlLabel>Description:</ControlLabel>
                                </Col>
                                <Col sm={8}>
                                    <textarea
                                        id="DescriptionSectionModal"
                                        onBlur={this.saveDescriptionSection}
                                        className="form-control"
                                        placeholder="Enter the description"
                                        defaultValue={this.state.description}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            <Col sm={6} smPush={3}>
                                <Button type="submit"  onClick={this.editSection} block id="editSection">Save changed</Button>
                            </Col>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                {
                    sections.map(function(section) {
                        var check = false;
                        if(self.checkValue(section.name, section.description, filter)) {
                            if(self.props.sectionsData.listCheckedSections.indexOf(section._id) != -1 || self.props.sectionsData.allChecked) {
                                check = true;
                            }
                            else {
                                check = false;
                            }
                            return (
                                <SectionsListItem openEditSection={self.openEditSection} openSectionDetails={self.openSectionDetails} check={check} section={section} key={section._id}/>
                            )
                        }
                    })}
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsSection, dispatch);
}

function mapStateToProps(state) {
    return {
        sectionsData: state.SectionsReducer,
    };
}
const SectionsListConnected = connect(mapStateToProps, mapDispatchToProps)(SectionList);
export default SectionsListConnected;