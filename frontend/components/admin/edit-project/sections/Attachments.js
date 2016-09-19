import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, TextInput, TextArea, FileUpload, TextFieldProject } from '../../../common/';
import File from './File';
import styles from '../../project/sections/styles/Attachments.sass';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        const files = e.target.files;
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.props.uploadFile(files[i]);
            }
            e.target.value = '';
        }
    }

    removeFile(e, name) {
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
        this.props.uploadFileByLinkAddProject(this.state.fileLink);
        this.setState({fileLink: ''})
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
                        <div className={styles["change-mode"]}>
                            <a href="javascript:void(0)"
                               onClick={this.setVisibleLinkForm}>
                                <i className="fa fa-exchange" aria-hidden="true"></i> {(this.state.hideForm === 'hidden') ? ' Upload by link' : ' Upload from computer'}
                            </a>
                        </div>

                        <div className={styles['add-section2'] + ' ' + this.state.hideForm}>
                            <div className={styles['col-1-2']}>
                                <MuiThemeProvider>
                                    <RaisedButton
                                        label="Upload by link"
                                        onClick={this.uploadFileByLink}
                                        className={styles["btn-upload"]}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className={styles['col-1-2']}>
                                <TextFieldProject
                                    hintText='File Link'
                                    onChange={this.saveFileLink}
                                    value={this.state.fileLink}
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>

                        <div className={styles['add-section2'] + ' '+this.state.hideFile}>
                            <div className={styles['col-1-2']}>
                                <MuiThemeProvider>
                                    <RaisedButton
                                        label="Upload files ..."
                                        labelPosition="before"
                                        className={styles["btn-upload"]}
                                    >
                                        <FileUpload
                                            accept={fileTypes}
                                            multiple={true}
                                            onChange={this.onFilePathChange}
                                            className={styles["file-input"]}
                                        />

                                    </RaisedButton>
                                </MuiThemeProvider>
                            </div>
                        </div>

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
        files: state.EditProjectReducer.files,
        hideFile: state.EditProjectReducer.hideFile,
        hideForm: state.EditProjectReducer.hideForm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);