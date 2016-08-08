import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FieldGroup, ButtonToolbar, FormGroup, ControlLabel, FormControl, Col, Form, Tabs, Tab } from 'react-bootstrap';
import styles from './styles/Features.sass';
import promise from 'es6-promise';
import * as actionsSection from "../../../actions/SectionsActions";
import * as actionsFeature from "../../../actions/FeaturesActions";
promise.polyfill();

class InsertFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureName: '',
            featureDescription: '',
            section: null
        };
        this.addFeature = this.addFeature.bind(this);
        this.saveNameFeature = this.saveNameFeature.bind(this);
        this.saveDescriptionFeature = this.saveDescriptionFeature.bind(this);
        this.saveSelectedSection = this.saveSelectedSection.bind(this);
    }

    componentWillMount () {
        this.props.getAllFeatures();
    }

    addFeature(e) {
        if(this.state.featureName.replace(/\s/g, '') == '' ||
            this.state.featureDescription.replace(/\s/g, '') == '') {
            console.log("Please, input all field");
            return;
        }
        const {features} = this.props.featuresData;
        this.props.addNewFeature(features, {
            featureName: this.state.featureName,
            featureDescription: this.state.featureDescription,
            section: this.state.section
        });
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
        alert(this.state.section);
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
                                     onChange={this.saveSelectedSection}>{
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
