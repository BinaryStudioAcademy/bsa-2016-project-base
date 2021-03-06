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
import ReduxToastr, {toastr} from 'react-redux-toastr'
const IMG_TYPES = ['.jpeg', '.jpg', '.png', '.gif'];
class TechDetailPage extends Component {
    constructor() {
        super();
        this.changeTechName = this.changeTechName.bind(this);
        this.changeTechDescription = this.changeTechDescription.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.saveVersion = this.saveVersion.bind(this);
        this.upload = this.upload.bind(this);
        this.setVisibleLinkForm = this.setVisibleLinkForm.bind(this);
        this.uploadFileByLink = this.uploadFileByLink.bind(this);
        this.saveFileLink = this.saveFileLink.bind(this);
        this.state = {
            techName: '',
            techDescription: '',
            techAvatar: '',
            doc: '',
            techVersion: '',
            hideFile: '',
            hideForm: '',
            fileLink: ''
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

    uploadFileByLink(e) {
        e.preventDefault();
        const ext =  this.state.fileLink.slice(this.state.fileLink.lastIndexOf('.'));

        if (IMG_TYPES.includes(ext)) {
            this.props.uploadFileByLink(this.state.fileLink);
        }else{
            toastr.error("It's wrong link or file format");
        }

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
            techName: this.state.techName,
            techDescription: this.state.techDescription,
            techAvatar: pic,
            techVersion: this.state.techVersion,
        };
        form.reset();
        this.props.updateData(this.props.routeParams.id, data);
        document.getElementById('return_to_list').click();
        this.setState({
            techName: '',
            techDescription:'',
            techVersion:'',
            fileLink:'',
            techAvatar: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                techName: nextProps.state.listOfTechnologies.techName,
                techDescription: nextProps.state.listOfTechnologies.techDescription,
                techAvatar: nextProps.state.listOfTechnologies.techAvatar,
                techVersion: nextProps.state.listOfTechnologies.techVersion,
                hideFile: nextProps.state.hideFile,
                hideForm: nextProps.state.hideForm,
                fileLink: nextProps.state.fileLink
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
        this.props.uploadFileByFile(fd);

    }

    setVisibleLinkForm() {
        let {hideFile, hideForm} = this.state;
        if (hideFile === 'visible') {
            hideFile = 'hidden'
        } else {
            hideFile = 'visible'
        }
        if (hideForm === 'visible') {
            hideForm = 'hidden'
        } else {
            hideForm = 'visible'
        }
        this.props.setVisibleUploadByLink(hideFile, hideForm);
    }

    componentWillMount() {
        this.props.getTechnologies(this.props.routeParams.id);
    }

    saveVersion(e) {
        this.setState({techVersion: e.target.value})
    }

    saveFileLink(e) {
        this.setState({fileLink: e.target.value})
    }

    render() {
        return (
            <div id="technologies">
                <div className={styles['technologies-tab']}>

                    {(this.state.techAvatar && this.state.techAvatar !== '') ?
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
                        {(!this.state.techAvatar) ?
                            <div className="inputField">
                                <a href="javascript:void(0)"
                                   onClick={this.setVisibleLinkForm}>{(this.state.hideForm === 'hidden') ? 'UploadByLink' : 'UploadByFile'}</a>
                            </div>
                            : ''}
                        {(!this.state.techAvatar) ?

                            <div className={this.state.hideForm + " inputField"}>
                                <TextInput
                                    label="File Link"
                                    onChange={this.saveFileLink}
                                    placeholder="File link"
                                />
                                <input type="button"
                                       label='UploadByLink'
                                       onClick={this.uploadFileByLink}
                                       style={{display: 'block', marginTop: '20px'}}
                                       value='UploadByLink'
                                />
                            </div>
                            : ''}
                        <div className="inputField">
                            {(!this.state.techAvatar || this.state.techAvatar === '') ?
                                <div>
                                    <input type="hidden" id="file_path" name="techAvatar"
                                           value={this.state.techAvatar}/>
                                    <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                                    <input className={this.state.hideFile} type="file" id="file" name="afile"
                                           onChange={this.upload}/>
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

