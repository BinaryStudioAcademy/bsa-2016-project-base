/**
 * Created by razorka on 04.08.16.
 */
import React, {Component, PropTypes} from 'react';
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
        this.saveVersion = this.saveVersion.bind(this);
        this.saveFileLink = this.saveFileLink.bind(this);
        this.uploadFileByLink = this.uploadFileByLink.bind(this);
        this.setVisibleLinkForm = this.setVisibleLinkForm.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.state = {
            formState: this.props.formState,
            techName: '',
            techDescription: '',
            techVersion: '',
            fileLink: '',
            techAvatar: this.props.techAvatar,
            hideFile: this.props.hideFile,
            hideForm: this.props.hideForm
        }
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

    upload(e) {
        var self = this;
        var error = document.getElementById('error');
        error.classList.add('hidden');
        error.classList.remove('visible');
        var file = document.getElementById('file').files[0];
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("afile", file);
        this.props.uploadFileByFile(fd);
    }

    submitForm(e) {
        e.preventDefault();
        let form = e.target;
      //  var file = document.getElementById('file').files[0];
        let data = {
            techName: this.state.techName,
            techDescription: this.state.techDescription,
            techAvatar: this.state.techAvatar,
            techVersion: this.state.techVersion
        };
      // document.getElementById('img').remove();
       form.reset();
       this.props.saveTechnologie(data);
        this.setState({
            techName: '',
            techDescription:'',
            techVersion:'',
            fileLink:'',
            techAvatar: ''
        });


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

    validate(e) {
        if (e.target.value.length < 50) {
            this.setState({
                techName: e.target.value
            });
            document.getElementById("error").className = 'visible';
            document.getElementById("error").className = 'hidden';
        } else {
            e.preventDefault();
            document.getElementById("error").className = 'hidden';
            document.getElementById("error").className = 'visible';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formState: nextProps.formState,
            filepath: nextProps.filepath,
            techName: nextProps.techName || this.state.techName,
            techDescription: nextProps.techDescription || this.state.techDescription,
            techVersion: nextProps.techVersion || this.state.techVersion,
            fileLink: nextProps.fileLink,
            techAvatar: nextProps.techAvatar || this.state.techAvatar,
            hideFile: nextProps.hideFile,
            hideForm: nextProps.hideForm,
        });
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.formState !== this.props.formState || nextProps.hideFile !== this.props.hideFile) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    saveTechDescription(e) {
        this.setState({techDescription: e.target.value})
    }

    saveFileLink(e) {
        this.setState({fileLink: e.target.value})
    }

    saveVersion(e) {
        this.setState({techVersion: e.target.value})
    }

    uploadFileByLink(e) {
        e.preventDefault();
        this.props.uploadFileByLink(this.state.fileLink);
    }

    deleteImage(){
        this.props.deleteImageList();
    }

    render() {

        return (
            <div id="addForm" className={styles['technologies-tab'] + ' ' + this.state.formState}>
                {(this.props.techAvatar) ?
                    <div id="img" className={styles['detail_picture_wrapper']}>
                        <img src={this.props.techAvatar}/>
                        <a href="javascript:void(0);" onClick={this.deleteImage}>Delete Image</a>
                    </div>
                    : ''
                }
                <form className={styles['form']} onSubmit={this.submitForm}>
                    <div className="inputField">
                        <TextInput
                            label="Name"
                            onChange={this.validate}
                            placeholder="Enter name"
                        />
                        <div id="error" className={styles['error'] + " hidden"}>Technology length must be less 50
                            symbols
                        </div>
                    </div>
                    <div className="inputField">
                        <TextInput
                            label="Version"
                            onChange={this.saveVersion}
                            placeholder="Enter version"
                        />
                    </div>
                    <div className="inputField">
                              <TextArea
                                  label="Description"
                                  className={styles['text-select-input']}
                                  onChange={this.saveTechDescription}
                                  placeholder="Enter description"
                              />
                    </div>
                    {(!this.props.techAvatar) ?
                        <div className="inputField">
                            <a href="javascript:void(0)"
                               onClick={this.setVisibleLinkForm}>{(this.state.hideForm === 'hidden') ? 'UploadByLink' : 'UploadByFile'}</a>
                        </div>
                        : ''}
                    <input type="hidden" id="file_path" name="techAvatar" value=''/>
                    {(!this.props.techAvatar) ?

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
                        <div id="error" className={styles['error'] + " hidden"}>Wrong file formant</div>
                        {(!this.props.techAvatar) ?
                        <input className={this.state.hideFile} type="file" id="file" name="afile"
                               onChange={this.upload}/>
                            :''}


                        <RaisedButtonUI
                            label='Send'
                            style={{display: 'block', marginTop: '20px'}}
                        />
                    </div>
                </form>
                <Element name="myScrollToElement"></Element>
            </div>


        )
    }
}
export default TechnologiesAddForm;