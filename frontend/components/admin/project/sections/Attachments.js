import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import {Button, TextInput, TextArea, FileUpload} from '../../../common/';
import File from './File';
import styles from './styles/Attachments.sass';

const fileTypes = 'image/jpeg,image/png,image/gif,application/xml,text/xml,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,\
application/msword,application/zip,application/x-rar-compressed,application/octet-stream,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';


class Attachments extends Component {
    constructor(props) {
        super(props);
        this.onFilePathChange = this.onFilePathChange.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.setVisibleLinkForm = this.setVisibleLinkForm.bind(this);
        this.uploadFileByLink = this.uploadFileByLink.bind(this);
        this.saveFileLink = this.saveFileLink.bind(this);
        this.state = {
            hideFile: this.props.hideFile,
            hideForm: this.props.hideForm,
            fileLink: ''
        };
    }

    onFilePathChange(e) {
        console.log('onFilePathChange url', e.target.value);
        const files = e.target.files;
        console.log(e.target.files.length);
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.props.uploadFile(files[i]);
            }
            e.target.value = '';
        }
    }

    removeFile(e, name) {
        console.log('removeFile ', name);
        this.props.removeFile(name);
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
        this.props.setVisibleUploadByLinkAttachments(hideFile, hideForm);
    }

    uploadFileByLink() {
        this.props.uploadFileByLinkAttachments(this.state.fileLink);
    }

    saveFileLink(e) {
        this.setState({fileLink: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                files: nextProps.files,
                hideFile: nextProps.hideFile,
                hideForm: nextProps.hideForm,
                fileLink: nextProps.fileLink
            }
        );
    }

    render() {
        const {files} = this.props;
        const list = files.map((file, index) => {
            if (file.target === 'file') {
                return (
                    <File
                        key={index}
                        file={file}
                        onClick={this.removeFile}
                    />
                );
            }
        });
        return (
            <div id={styles["attachments"]}>
                <header>
                    <h2>Attachments</h2>
                </header>
                <div className={styles.row}>
                    <div className={styles['field-container']}>
                        <div className="inputField">
                            <a href="javascript:void(0)"
                               onClick={this.setVisibleLinkForm}>{(this.state.hideForm === 'hidden') ? 'UploadByLink' : 'UploadByFile'}</a>
                        </div>
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

                        <FileUpload
                            className={this.state.hideFile + ' ' + styles["upload-container"]}
                            accept={fileTypes}
                            multiple={true}
                            onChange={this.onFilePathChange}
                        />

                        <div className={styles["list"]}>
                            {list}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

Attachments.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};
function mapStateToProps(state) {
    return {
        files: state.UpsertProjectReducer.files,
        hideFile: state.UpsertProjectReducer.hideFile,
        hideForm: state.UpsertProjectReducer.hideForm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);
