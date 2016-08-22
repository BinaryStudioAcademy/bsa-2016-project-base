/**
 * Created by razorka on 04.08.16.
 */
import React, {Component, PropTypes} from 'react';
// import styles from './styles.sass';
import {Button, FormGroup, ControlLabel, FormControl, Col, Form} from 'react-bootstrap';
import styles from  './styles.sass';
import TextArea from '../../common/TextArea.js';
import TextInput from '../../common/TextInput.js';
import Scroll, {Element, scroller} from  'react-scroll';
import RaisedButtonUI from '../../common/RaisedButton-ui.js';

class TechnologiesAddForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.upload = this.upload.bind(this);
        this.validate = this.validate.bind(this);
        this.saveTechDescription = this.saveTechDescription.bind(this);
        this.state = {
            formState: this.props.formState,
            techName: '',
            techDescription: ''
        }
    }

    upload(e) {
        var error = document.getElementById('error');
        error.classList.add('hidden');
        error.classList.remove('visible');
        var file = document.getElementById('file').files[0];
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("afile", file);
        xhr.open("POST", "/api/file/", true);
        xhr.send(fd);
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.type === 'success') {
                    document.getElementById('file_path').value = result.file;
                } else {
                    error.classList.remove('hidden');
                    error.classList.add('visible');
                }
            }
        }

    }

    submitForm(e) {
        e.preventDefault();
        let form = e.target;
        var file = document.getElementById('file').files[0];
        let data = {
            techName: this.state.techName,
            techDescription: this.state.techDescription,
            techAvatar: form.elements['techAvatar'].value
        };
        form.reset();
        this.props.saveTechnologie(data);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.formState === 'hidden') {
            scroller.scrollTo('myScrollToElement', {
                duration: 1500,
                delay: 100,
                smooth: true,
            })
        }
    }

    validate(e){
        if(e.target.value.length < 50){
            this.setState({
                techName: e.target.value
            });
            document.getElementById("error").className = 'visible';
            document.getElementById("error").className ='hidden';
        }else{
            e.preventDefault();
            document.getElementById("error").className ='hidden';
            document.getElementById("error").className = 'visible';
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            formState: nextProps.formState,
            filepath: nextProps.filepath,
            techName: nextProps.techName
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.formState !== this.props.formState) {
            return true;
        } else {
            return false;
        }
    }

    saveTechDescription(e) {
        this.setState({techDescription: e.target.value})
    }

    render() {

        return (
            <div id="addForm" className={styles['technologies-tab'] + ' ' + this.state.formState}>
                <Form horizontal className={styles['form']} onSubmit={this.submitForm}>
                    <FormGroup>
                        <Col sm={2} smPush={1}>
                            <ControlLabel >Name:</ControlLabel>
                        </Col>
                        <Col sm={8} smPush={1}>
                            <TextInput
                                onChange={this.validate}
                                placeholder="Enter name"
                            />
                            <div id="error" className={styles['error'] + " hidden"}>Technology length must be less 50 symbols</div>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} smPush={1}>
                            <ControlLabel >Description:</ControlLabel>
                        </Col>
                        <Col sm={8} smPush={1}>
                              <TextArea
                                  label=""
                                  className={styles['text-select-input']}
                                  onChange={this.saveTechDescription}
                                  placeholder="Enter description"
                              />
                        </Col>
                    </FormGroup>
                    <input type="hidden" id="file_path" name="techAvatar" value=''/>
                    <Col sm={6} smPush={3}>
                        <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                        <input type="file" id="file" name="afile" onChange={this.upload}/>
                        <RaisedButtonUI
                            label='Send'
                            style={{display: 'block', marginTop: '20px'}}
                        />

                    </Col>
                </Form>
                <Element name="myScrollToElement"></Element>
            </div>


        )
    }
}
export default TechnologiesAddForm;