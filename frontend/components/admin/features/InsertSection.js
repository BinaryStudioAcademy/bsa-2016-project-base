import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FieldGroup, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import styles from './styles/Features.sass';
import * as actions from "../../../actions/SectionsActions";

class InsertSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
        this.addSection = this.addSection.bind(this);
        this.saveNameSection = this.saveNameSection.bind(this);
        this.saveDescriptionSection = this.saveDescriptionSection.bind(this);
    }

    componentDidMount() {
        this.props.getAllSections();
    }

    addSection(e) {
        if(this.state.name.replace(/\s/g, '') == '' ||
            this.state.description.replace(/\s/g, '') == '') {
            console.log("Please, input all field");
            return;
        }
        const {sections} = this.props.data;
        this.props.addNewSection(sections, {
               name: this.state.name,
                description: this.state.description
            });
        this.props.getAllSections();
        e.preventDefault();
    }

    saveNameSection(e) {
        this.setState({name: e.target.value});
    }

    saveDescriptionSection(e) {
        this.state.description = e.target.value;
    }

    render() {
        return (
            <Form horizontal className={styles['form']}>
                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel className={styles['text']}>Name of section:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            className={styles['text-select-input']}
                            id="nameSection"
                            ref="nameSection"
                            onBlur={this.saveNameSection}
                            type="text"
                            placeholder="Enter the name of section"
                            required
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4} >
                        <ControlLabel className={styles['text']}>Description:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            className={styles['textareaInput']}
                            id="DescriptionSection"
                            ref="DescriptionSection"
                            onBlur={this.saveDescriptionSection}
                            componentClass="textarea"
                            placeholder="Enter the description"
                            required
                        />
                    </Col>
                </FormGroup>

                <Col sm={3} >
                    <Button type="submit" bsStyle="primary" block className={styles['btn']} id="addSection" onClick={this.addSection} >Add</Button>
                </Col>
            </Form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state) {
    return {
        data: state.SectionsReducer
    }
}

const InsertSectionConnected = connect(mapStateToProps, mapDispatchToProps)(InsertSection);
export default InsertSectionConnected;



