/**
 * Created by razorka on 04.08.16.
 */
import React, {Component, PropTypes} from 'react';
// import styles from './styles.sass';
import { Button, FieldGroup, ButtonToolbar, FormGroup, ControlLabel, FormControl, Col, Form, Tabs, Tab } from 'react-bootstrap';
import styles from '../features/styles/Features.sass';
class TechnologiesAddForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            formState: this.props.formState
        }
    }

    upload(e) {

        var file = document.getElementById('file').files[0];


        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("afile", file);
        xhr.onload = xhr.onerror = function () {
            if (this.status == 200) {
                console.log("success");
            } else {
                console.log("error " + this.status);
            }
        };

        // обработчик для закачки
        xhr.upload.onprogress = function (event) {
            console.log(event.loaded + ' / ' + event.total);
        }
        xhr.open("POST", "/api/file/", true);
        xhr.send(fd);
    }

    submitForm(e) {
        e.preventDefault();

        let form = e.target;
        var file = document.getElementById('file').files[0];

        let data = {
            techName: form.elements['techName'].value,
            techDescription: form.elements['techDescription'].value,
            techAvatar: file
        };
        form.reset();
        this.props.saveTechnologie(data);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formState: nextProps.formState
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.formState !== this.props.formState) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        return (
            <div className={styles['feature-tabs'] + ' '+this.state.formState}>
            <Form horizontal className={styles['form']} onSubmit={this.submitForm}>
                <FormGroup>
                    <Col sm={2} smPush={1}>
                        <ControlLabel >Name of technology:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl type="text" name="techName"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} smPush={1}>
                        <ControlLabel >Description:</ControlLabel>
                    </Col>
                    <Col sm={8} smPush={1}>
                        <FormControl name="techDescription" componentClass="textarea"
                                  className={styles['text-select-input']}
                                     placeholder="Enter the description"
                                     required></FormControl>
                    </Col>
                </FormGroup>
                <Col sm={6} smPush={3}>
                <input type="file" id="file" name="afile" onChange={this.upload}/>
                <Button block type="submit" >Send</Button>

                </Col>
            </Form>
                </div>

        )
    }
}
export default TechnologiesAddForm;