/**
 * Created by razorka on 10.08.16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../../../../actions/admin/TechnologiesDetailActions";
import styles from  '../styles.sass';
import {Link} from 'react-router'
import TextArea from '../../../common/TextArea.js';
import TextInput from '../../../common/TextInput.js';
import RaisedButtonUI from '../../../common/RaisedButton-ui.js';
class TechDetailPage extends Component {
    constructor() {
        super();
        this.changeTechName = this.changeTechName.bind(this);
        this.changeTechDescription = this.changeTechDescription.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.saveVersion = this.saveVersion.bind(this);
        this.state = {
            techName: '',
            techDescription: '',
            techAvatar: '',
            doc: '',
            techVersion: ''
        }
    }

    deleteImage() {
        this.props.deleteImage(this.state.techAvatar, this.props.routeParams.id);
        let data = {
            techName: this.state.techName,
            techDescription: this.state.techDescription,
            techAvatar: '',
            techVersion: this.state.techVersion
        };
        this.props.updateData(this.props.routeParams.id, data);
    }


    changeTechName(e) {
        if (e.target.value.length < 50) {
            this.setState({
                techName: e.target.value
            });
            e.target.nextSibling.classList.remove('visible');
            e.target.nextSibling.classList.add('hidden');
        } else {
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
        if (form.elements['techAvatar']) {
            pic = form.elements['techAvatar'].value;
        } else {
            pic = this.state.techAvatar
        }
        let data = {
            techName: form.elements['techName'].value,
            techDescription: form.elements['techDescription'].value,
            techAvatar: pic,
            techVersion: form.elements['techVersion'].value,
        };
        form.reset();
        this.props.updateData(this.props.routeParams.id, data);
        document.getElementById('return_to_list').click();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                techName: nextProps.state.listOfTechnologies.techName,
                techDescription: nextProps.state.listOfTechnologies.techDescription,
                techAvatar: nextProps.state.listOfTechnologies.techAvatar,
                doc: nextProps.state.doc,
                techVersion: nextProps.state.listOfTechnologies.techVersion,
            }
        );
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

    componentWillMount() {
        this.props.getTechnologies(this.props.routeParams.id);
    }

    saveVersion(e) {
        this.setState({techVersion: e.target.value})
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


                    <form className={styles['form']} onSubmit={this.submitForm}>
                        <div className="inputField">
                            <TextInput
                                label="Name"
                                name="techName"
                                onChange={this.changeTechName}
                                value={this.state.techName}
                                placeholder="Enter name"
                            />
                            <div id="error" className={styles['error'] + " hidden"}>Technology length must be less 50
                                symbols
                            </div>
                        </div>
                        <div className="inputField">
                            <TextInput
                                label="Version"
                                name="techVersion"
                                onChange={this.saveVersion}
                                value={this.state.techVersion}
                                placeholder="Enter version"
                            />
                        </div>
                        <div className="inputField">
                           <TextArea
                               label="Description"
                               name="techDescription"
                               className={styles['text-select-input']}
                               onChange={this.changeTechDescription}
                               placeholder="Enter description"
                               value={this.state.techDescription}
                           />
                        </div>

                        <div className="inputField">
                            {(this.state.techAvatar.length === 0) ?
                                <div>
                                    <input type="hidden" id="file_path" name="techAvatar"
                                           value={this.state.techAvatar}/>
                                    <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                                    <input type="file" id="file" name="afile" onChange={this.upload}/>
                                </div>
                                : ''
                            }
                            <RaisedButtonUI
                                label='Send'
                                style={{display: 'block', marginTop: '20px'}}
                            />
                            <Link id="return_to_list" to="/admin/tech/"></Link>
                        </div>
                    </form>
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

