/**
 * Created by razorka on 10.08.16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../../../../actions/admin/TechnologiesDetailActions";
import styles from  '../styles.sass';
import {Button, FormGroup, ControlLabel, FormControl, Col, Form} from 'react-bootstrap';
import {Link} from 'react-router'
class TechDetailPage extends Component {
    constructor() {
        super();
        this.changeTechName = this.changeTechName.bind(this);
        this.changeTechDescription = this.changeTechDescription.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            techName: '',
            techDescription: '',
            techAvatar: ''
        }
    }

    deleteImage(){
        this.props.deleteImage(this.state.techAvatar,this.props.routeParams.id);
        let data ={
            techName: this.state.techName,
            techDescription: this.state.techDescription,
            techAvatar: '',
        };
        this.props.updateData(this.props.routeParams.id,data);
    }

    changeTechName(e) {
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

    changeTechDescription(e) {
        this.setState({
            techDescription: e.target.value
        })
    }
    submitForm(e) {
        e.preventDefault();
        let pic;
        let form = e.target;
        if(form.elements['techAvatar']){
            pic = form.elements['techAvatar'].value;
        }else{
            pic =  this.state.techAvatar
        }
        let data = {
            techName: form.elements['techName'].value,
            techDescription: form.elements['techDescription'].value,
            techAvatar: pic
        };
        form.reset();
        this.props.updateData(this.props.routeParams.id,data);
        document.getElementById('return_to_list').click();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                techName: nextProps.state.listOfTechnologies.techName,
                techDescription: nextProps.state.listOfTechnologies.techDescription,
                techAvatar: nextProps.state.listOfTechnologies.techAvatar,
            }
        );
    }

    upload(e) {
        var error =  document.getElementById('error');
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
                if(result.type === 'success') {
                    document.getElementById('file_path').value = result.file;
                }else{
                    error.classList.remove('hidden');
                    error.classList.add('visible');
                }
            }
        }

    }

    componentWillMount() {
        this.props.getTechnologies(this.props.routeParams.id);
    }

    render() {
        return (
            <div id="technologies">
                <div className={styles['technologies-tab']}>

                    {(this.state.techAvatar.length > 0) ?
                        <div className={styles['detail_picture_wrapper']}>
                            <img src={this.state.techAvatar}/>
                            <a href="javascript:void(0);" onClick={this.deleteImage}>Delete Image</a>
                        </div>

                        : ''
                    }


                    <Form horizontal className={styles['form']} onSubmit={this.submitForm}>
                        <FormGroup>
                            <Col sm={2} smPush={1}>
                                <ControlLabel >Name of technology:</ControlLabel>
                            </Col>
                            <Col sm={8} smPush={1}>
                                <FormControl required onChange={this.changeTechName} value={this.state.techName} type="text"
                                             name="techName"/>
                                <div id="error" className={styles['error'] + " hidden"}>Technology length must be less 50 symbols</div>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} smPush={1}>
                                <ControlLabel >Description:</ControlLabel>
                            </Col>
                            <Col sm={8} smPush={1}>
                                <FormControl onChange={this.changeTechDescription} value={this.state.techDescription}
                                             name="techDescription"
                                             componentClass="textarea"
                                             className={styles['text-select-input']}
                                             placeholder="Enter the description"
                                             required></FormControl>
                            </Col>
                        </FormGroup>

                        <Col sm={6} smPush={3}>
                            {(this.state.techAvatar.length === 0) ?
                                <div>
                                    <input type="hidden" id="file_path" name="techAvatar" value={this.state.techAvatar}/>
                                    <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                                    <input type="file" id="file" name="afile" onChange={this.upload}/>
                                </div>
                                : ''
                            }
                            <Button block type="submit">Send</Button>
                            <Link id="return_to_list" to="/admin/tech/"></Link>
                        </Col>
                    </Form>
                </div>
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
        state: state.TechnologiesDetailReducer
    };
}
const TechDetail = connect(mapStateToProps, mapDispatchToProps)(TechDetailPage);
export default TechDetail;

