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
            featureDescription: '',
            section: ""
        };
        this.addFeature = this.addFeature.bind(this);
        this.saveNameFeature = this.saveNameFeature.bind(this);
        this.saveDescriptionFeature = this.saveDescriptionFeature.bind(this);
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
            this.state.featureDescription.replace(/\s/g, '') == '' ||
            !this.state.section || this.state.section == "Select section"){
            console.log("Please, input all field");
            e.preventDefault();
            return;
        }

        if(searchSameFeature) {
            return;
        }

        const {features} = this.props.featuresData;
        this.props.addNewFeature(features, {
            featureName: this.state.featureName,
            featureDescription: {lists: [this.state.featureDescription]},
            section: this.state.section
        });
        this.refs.nameFeature.value = '';
        this.refs.DescriptionFeature.value = '';
        this.refs.selectSection.value = 'Select section';

        this.setState({
            featureName: '',
            featureDescription: '',
            section: ""
        });
        this.props.getAllFeaturesOfAllProjects();
    }

    saveNameFeature(e) {
        this.setState({featureName: e.target.value});
    }

    saveDescriptionFeature(e) {
        this.setState({featureDescription: e.target.value});
    }

    saveSelectedSection(e) {
        this.setState({section: e.target.value});
    }

    render() {
        return (
            <Form horizontal className={styles['form']} >
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
                        <ControlLabel>Description (*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <textarea
                            className="form-control"
                            ref="DescriptionFeature"
                            id="DescriptionFeature"
                            onBlur={this.saveDescriptionFeature}
                            placeholder="Enter the description"
                            required
                        />
                    </Col>
                </FormGroup>
                <Col sm={6} smPush={3}>
                    <Button type="submit"  onClick={this.addFeature} block id="addFeature">Add</Button>
                </Col>
            </Form>
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
