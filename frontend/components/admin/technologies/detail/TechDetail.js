/**
 * Created by razorka on 10.08.16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../../../../actions/admin/TechnologiesDetailActions";
import styles from  '../styles.sass';
import {Button, FormGroup, ControlLabel, FormControl, Col, Form} from 'react-bootstrap';
class TechDetailPage extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        let url = window.location.pathname;
        let data = url.split('/');
        let id = data[data.length - 1];
        this.props.getTechnologies(id);
    }

    render() {
        const {listOfTechnologies} =this.props.stateFromReducer.TechnologiesDetailReducer;

        return (
            <div className={styles['technologies-tab']}>
                <Form horizontal className={styles['form']}>
                    <FormGroup>
                        <Col sm={2} smPush={1}>
                            <ControlLabel >Name of technology:</ControlLabel>
                        </Col>
                        <Col sm={8} smPush={1}>
                            <FormControl value={listOfTechnologies.techName} type="text" name="techName"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} smPush={1}>
                            <ControlLabel >Description:</ControlLabel>
                        </Col>
                        <Col sm={8} smPush={1}>
                            <FormControl value={listOfTechnologies.techDescription} name="techDescription"
                                         componentClass="textarea"
                                         className={styles['text-select-input']}
                                         placeholder="Enter the description"
                                         required></FormControl>
                        </Col>
                    </FormGroup>
                    <input type="hidden" id="file_path" name="techAvatar" value=''/>
                    <Col sm={6} smPush={3}>
                        <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                        <input type="file" id="file" name="afile" onChange={this.upload}/>
                        <Button block type="submit">Send</Button>

                    </Col>
                </Form>
            </div>
        )
    }
}
;
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}
const TechDetail = connect(mapStateToProps, mapDispatchToProps)(TechDetailPage);
export default TechDetail;

