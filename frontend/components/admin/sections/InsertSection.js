import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import styles from './styles/Sections.sass';
import * as actions from "../../../actions/admin/SectionsActions";

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

    addSection(e) {
        e.preventDefault();
        var self = this;
        let searchSameSection = this.props.sectionData.sections.some(function(el) {
            if(el.name == self.state.name) {
                console.log("Error! Section with same name already exist in base");
                return true;
            }
        });

        if(this.state.name.replace(/\s/g, '') == '' ||
            this.state.description.replace(/\s/g, '') == '') {
            console.log("Please, input all field");
            return;
        }

        if(searchSameSection) {
            return;
        }

        const {sections} = this.props.sectionData;
        this.props.addNewSection(sections, {
               name: this.state.name,
                description: this.state.description
            });
        this.refs.nameSection.value = '';
        this.refs.DescriptionSection.value = '';
        this.setState({
            name: '',
            description: ''
        });
        this.props.unMarkAll();
        this.props.getAllSections();
    }

    saveNameSection(e) {
        this.setState({name: e.target.value});
    }

    saveDescriptionSection(e) {
        this.setState({
            description: e.target.value
        });
    }

    render() {
        return (
            <Col sm={10} smPush={1}>
            <Form horizontal className={styles['form'] + ' ' + this.props.sectionData.visibilityForm + ' ' + 'formInsertSection'}>
                <FormGroup >
                    <Col sm={3} smPush={1}>
                        <ControlLabel>Name (*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <input
                            className="form-control"
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
                    <Col sm={3} smPush={1}>
                        <ControlLabel>Description (*):</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <textarea
                            className="form-control"
                            id="DescriptionSection"
                            ref="DescriptionSection"
                            onBlur={this.saveDescriptionSection}
                            placeholder="Enter the description"
                            required
                        />
                    </Col>
                </FormGroup>
                <Col sm={6} smPush={3}>
                    <Button type="submit"  block  id="addSection" onClick={this.addSection} >Add</Button>
                </Col>
            </Form>
                </Col>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}
function mapStateToProps(state) {
    return {
        sectionData: state.SectionsReducer
    }
}
const InsertSectionConnected = connect(mapStateToProps, mapDispatchToProps)(InsertSection);
export default InsertSectionConnected;



