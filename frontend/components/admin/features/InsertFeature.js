import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import styles from './styles/Features.sass';
import * as actionsSection from "../../../actions/admin/SectionsActions";
import * as actionsFeature from "../../../actions/admin/FeaturesActions";

class InsertFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureName: '',
            descriptionText: '',
            descriptionHTMLText: '',
            section: ""
        };
        this.addFeature = this.addFeature.bind(this);
        this.saveNameFeature = this.saveNameFeature.bind(this);
        this.saveDescriptionText  = this.saveDescriptionText.bind(this);
        this.saveDescriptionHTMLText = this.saveDescriptionHTMLText.bind(this);
        this.saveSelectedSection = this.saveSelectedSection.bind(this);
    }

    addFeature(e) {
        e.preventDefault();
        let self = this;
        let searchSameFeature = this.props.featuresData.features.some(function(el) {
            if(el.featureName == self.state.featureName) {
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

        if(searchSameFeature) {
            return;
        }

        const {features} = this.props.featuresData;
        this.props.addNewFeature(features, {
            featureName: this.state.featureName,
            descriptionText: this.state.descriptionText,
            descriptionHTMLText: this.state.descriptionHTMLText,
            section: this.state.section
        });
        this.refs.nameFeature.value = '';
        this.refs.selectSection.value = 'Select section';
        this.refs.descriptionHTMLText.value = '';
        this.refs.descriptionText.value = '';

        this.setState({
            featureName: '',
            descriptionText: '',
            descriptionHTMLText: '',
            section: ""
        });
        this.props.unMarkAll();
        this.props.getAllFeaturesOfAllProjects();
    }

    saveNameFeature(e) {
        this.setState({featureName: e.target.value});
    }

    saveDescriptionText(e) {
        this.setState({descriptionText: e.target.value});
    }

    saveDescriptionHTMLText(e) {
        this.setState({descriptionHTMLText: e.target.value})
    }

    saveSelectedSection(e) {
        this.setState({section: e.target.value});
    }

    render() {
        return (
            <Col sm={10} smPush={1}>
            <Form horizontal className={styles['form'] + ' ' + this.props.featuresData.visibilityForm + ' ' + 'formInsertFeature'} >
                <FormGroup>
                    <Col sm={3} smPush={1}>
                        <ControlLabel >Name(*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <input
                            className="form-control"
                            ref="nameFeature"
                            id="nameFeature"
                            type="text"
                            onBlur={this.saveNameFeature}
                            placeholder="Enter the name of feature"
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={3} smPush={1}>
                        <ControlLabel >Section (*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <select className={styles['text-select-input'] + ' ' + "form-control"}  ref="selectSection" id="selectSection"
                                     onChange={this.saveSelectedSection}   required>
                            <option key={0} value="Select section" >Select section</option>
                            {

                                this.props.sectionsData.sections.map(function(el, index) {
                                    return (
                                        <option key={index} value={el._id} >{el.name}</option>
                                    )
                                })
                            }
                        </select>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={3} smPush={1}>
                        <ControlLabel>Short description (*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <textarea
                            className="form-control"
                            ref="descriptionText"
                            id="descriptionText"
                            onBlur={this.saveDescriptionText}
                            placeholder="Enter the description"
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={3} smPush={1}>
                        <ControlLabel>Full description:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <textarea
                            className="form-control"
                            ref="descriptionHTMLText"
                            id="descriptionHTMLText"
                            onBlur={this.saveDescriptionHTMLText}
                            placeholder="Enter the description"
                        />
                    </Col>
                </FormGroup>
                <Col sm={6} smPush={3}>
                    <Button type="submit"  onClick={this.addFeature} block id="addFeature">Add</Button>
                </Col>
            </Form>
                </Col>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...actionsSection,
            ...actionsFeature}, dispatch)
}

function mapStateToProps(state) {
    return {
        sectionsData: state.SectionsReducer,
        featuresData: state.FeaturesReducer,
    }
}

const InsertFeatureConnected = connect(mapStateToProps, mapDispatchToProps)(InsertFeature);
export default InsertFeatureConnected;