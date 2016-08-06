/**
 * Created by vvyst on 05.08.2016.
 */
import React, { Component, PropTypes } from 'react';
import { Button, FieldGroup, ButtonToolbar, FormGroup, ControlLabel, FormControl, Col, Form, Tabs, Tab } from 'react-bootstrap';
import styles from './styles/Features.sass';

export default class InsertFeature extends Component {
    render() {
        return (
            <Form horizontal className={styles['form']}>
                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel className={styles['text']}>Name of feature:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            className={styles['text-select-input']}
                            id="nameFeature"
                            type="text"
                            placeholder="Enter the name of feature"
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel className={styles['text']}>Select section:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl componentClass="select" className={styles['text-select-input']} id="selectSection">
                            <option value="select">select</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel className={styles['text']}>Description:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            className={styles['textareaInput']}
                            id="DescriptionFeature"
                            componentClass="textarea"
                            placeholder="Enter the description"
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <ControlLabel className={styles['text']}>Files:</ControlLabel>
                    </Col>

                    <Col sm={8}>
                        <FormControl
                            className={styles['text']}
                            id="uploadFilesFeature"
                            type="file"
                            placeholder="Enter text"
                        />
                    </Col>
                </FormGroup>

                <Col sm={3} >
                    <Button type="submit" bsStyle="primary" block className={styles['btn']} id="addFeature">Add</Button>
                </Col>
            </Form>
        )
    }
}
