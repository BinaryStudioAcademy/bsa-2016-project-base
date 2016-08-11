/**
 * Created by razorka on 04.08.16.
 */
import React, {Component, PropTypes} from 'react';
// import styles from './styles.sass';
import {Button, FormGroup, ControlLabel, FormControl, Col, Form} from 'react-bootstrap';
import styles from  './styles.sass';
import Scroll, {Element, scroller} from  'react-scroll';

class TechnologiesAddForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.upload = this.upload.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            formState: this.props.formState,
            techName: ''
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
            techName: form.elements['techName'].value,
            techDescription: form.elements['techDescription'].value,
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
            e.target.nextSibling.classList.remove('visible');
            e.target.nextSibling.classList.add('hidden');
        }else{
            e.preventDefault();
            e.target.nextSibling.classList.remove('hidden');
            e.target.nextSibling.classList.add('visible');
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

    render() {

        return (
            <div id="addForm" className={styles['technologies-tab'] + ' ' + this.state.formState}>
                <Form horizontal className={styles['form']} onSubmit={this.submitForm}>
                    <FormGroup>
                        <Col sm={2} smPush={1}>
                            <ControlLabel >Name of technology:</ControlLabel>
                        </Col>
                        <Col sm={8} smPush={1}>
                            <FormControl type="text" value={this.state.techName} onKeyDown={this.validate} name="techName" required/>
                            <div id="error" className={styles['error'] + " hidden"}>Technology length must be less 50 symbols</div>
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
                    <input type="hidden" id="file_path" name="techAvatar" value=''/>
                    <Col sm={6} smPush={3}>
                        <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                        <input type="file" id="file" name="afile" onChange={this.upload}/>
                        <Button block type="submit">Send</Button>

                    </Col>
                </Form>
                <Element name="myScrollToElement"></Element>
            </div>


        )
    }
}
export default TechnologiesAddForm;