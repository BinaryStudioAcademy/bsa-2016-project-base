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
        if(this.state.featureName.replace(/\s/g, '') == '' ||
            this.state.featureDescription.replace(/\s/g, '') == '' ||
            !this.state.section || this.state.section == "Select section"){
            console.log("Please, input all field");
            e.preventDefault();
            return;
        }
        const {features} = this.props.featuresData;
        this.props.addNewFeature(features, {
            featureName: this.state.featureName,
            featureDescription: {lists: [this.state.featureDescription]},
            section: this.state.section
        });
        this.props.getAllFeaturesOfAllProjects();
        e.preventDefault();
    }

    saveNameFeature(e) {
        this.setState({featureName: e.target.value});
    }

    saveDescriptionFeature(e) {
        this.state.featureDescription = e.target.value;
    }

    saveSelectedSection(e) {
        this.state.section = e.target.value;
    }

    render() {
        return (
            <Form horizontal className={styles['form']}>
                <FormGroup>
                    <Col sm={2} smPush={1}>
                        <ControlLabel >Name of feature:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl
                            id="nameFeature"
                            type="text"
                            onBlur={this.saveNameFeature}
                            placeholder="Enter the name of feature"
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} smPush={1}>
                        <ControlLabel >Select section:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl componentClass="select"  className={styles['text-select-input']} id="selectSection"
                                     onChange={this.saveSelectedSection}   required>
                            <option key={0} value="Select section" >Select section</option>
                            {

                                this.props.sectionsData.sections.map(function(el, index) {
                                    return (
                                        <option key={index} value={el._id} >{el.name}</option>
                                    )
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={2} smPush={1}>
                        <ControlLabel>Description:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl
                            id="DescriptionFeature"
                            onBlur={this.saveDescriptionFeature}
                            componentClass="textarea"
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
