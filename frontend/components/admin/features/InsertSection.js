/**
 * Created by vvyst on 05.08.2016.
 */
import React, {Component} from 'react';
import { Button, FieldGroup, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import styles from './styles/Features.sass';
import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

export default class InsertSection extends Component {
    constructor(props) {
        super(props);
        this.addSection = this.addSection.bind(this);
        this.state = {
            name: '',
            description: ''
        };
    }

    addSection(e) {
        e.preventDefault();
    }

    saveNameSection(e) {
        alert(e.target.value);
    }

    saveNameFeature(e) {
        alert(e.target.value);
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
                            onBlur={this.saveNameFeature}
                            componentClass="textarea"
                            placeholder="Enter the description"
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



