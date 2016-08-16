import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import styles from './styles/Features.sass';
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

    componentDidMount() {
        this.props.getAllSections();
    }

    addSection(e) {
        e.preventDefault();
        var self = this;
        let searchSameSection = this.props.data.sections.some(function(el) {
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

        const {sections} = this.props.data;
        this.props.addNewSection(sections, {
               name: this.state.name,
                description: this.state.description
            });
        this.props.getAllSections();
    }

    saveNameSection(e) {
        this.setState({name: e.target.value.replace(/\s/g, '')});
    }

    saveDescriptionSection(e) {
        this.state.description = e.target.value.replace(/\s/g, '');
    }

    render() {
        return (
            <Form horizontal className={styles['form']}>
                <FormGroup >
                    <Col sm={2} smPush={1}>
                        <ControlLabel>Name of section:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl
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
                    <Col sm={2} smPush={1}>
                        <ControlLabel>Description:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl
                            id="DescriptionSection"
                            ref="DescriptionSection"
                            onBlur={this.saveDescriptionSection}
                            componentClass="textarea"
                            placeholder="Enter the description"
                            required
                        />
                    </Col>
                </FormGroup>
                <Col sm={6} smPush={3}>
                    <Button type="submit"  block  id="addSection" onClick={this.addSection} >Add</Button>
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



