import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextArea, FileUpload, TextFieldProject } from '../../../common/';
import File from './File';
import styles from './styles/Screenshots.sass';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const fileTypes = 'image/jpeg,image/png,image/gif';

class Screenshots extends Component {
    constructor(props) {
        super(props);
        this.onFilePathChange = this.onFilePathChange.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.setVisibleLinkForm = this.setVisibleLinkForm.bind(this);
        this.uploadFileByLink = this.uploadFileByLink.bind(this);
        this.saveFileLink = this.saveFileLink.bind(this);
        this.state = {
            hideFileScreenshoots: this.props.hideFileScreenshoots,
            hideFormScreenshoots: this.props.hideFormScreenshoots,
            fileLinkScreenshoots: ''
        };
    }

    onFilePathChange(e) {
        const files = e.target.files;
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.props.uploadFile(files[i], 'screenshot');
            }
            e.target.value = '';
        }
    }

    removeFile(e, name) {
        this.props.removeFile(name);
    }

    setVisibleLinkForm() {
        let {hideFileScreenshoots, hideFormScreenshoots} = this.state;
        if (hideFileScreenshoots === 'visible') {
            hideFileScreenshoots = 'hidden'
        } else {
            hideFileScreenshoots = 'visible'
        }
        if (hideFormScreenshoots === 'visible') {
            hideFormScreenshoots = 'hidden'
        } else {
            hideFormScreenshoots = 'visible'
        }
        this.props.setVisibleUploadByLinkScreenshoots(hideFileScreenshoots, hideFormScreenshoots);
    }

    uploadFileByLink() {
        this.props.uploadFileByLinkAddProject(this.state.fileLinkScreenshoots,'screenshot');
        this.setState({fileLinkScreenshoots: ''});
    }

    saveFileLink(e) {
        this.setState({fileLinkScreenshoots: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                files: nextProps.files,
                hideFileScreenshoots: nextProps.hideFileScreenshoots,
                hideFormScreenshoots: nextProps.hideFormScreenshoots,
                fileLinkScreenshoots: nextProps.fileLinkScreenshoots
            }
        );
    }

    render() {
        const {files} = this.props;
        const list = files.map((file, index) => {
            if (file.target === 'screenshot') {
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
            <div id={styles["screenshots"]}>
                <header>
                    <h2>Screenshots</h2>
                </header>
                <div className={styles.row}>
                    <div className={styles['field-container']}>
 		                 <div className={styles["change-mode"]}>
                            <a href="javascript:void(0)"
                               onClick={this.setVisibleLinkForm}>
                               <i className="fa fa-exchange" aria-hidden="true"></i> {(this.state.hideFormScreenshoots === 'hidden') ? ' Upload by link' : ' Upload from computer'}
                            </a>
                        </div>

                        <div className={styles['add-section2'] + ' ' + this.state.hideFormScreenshoots}>
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
                                    value={this.state.fileLinkScreenshoots}
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>
                    
                    <div className={styles['add-section2'] + ' '+ this.state.hideFileScreenshoots}>
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


                        {/*<div className={this.state.hideFormScreenshoots + " inputField"}>
                           
                             <TextFieldProject                                
                                hintText='File Link' 
                                onChange={this.saveFileLink}
                                value={this.state.fileLinkScreenshoots}
                                style={{width: '75%'}}
                            />
                            <MuiThemeProvider>
                            <RaisedButton
                                label="Upload by link"
                                onClick={this.uploadFileByLink}
                                //className={styles["btn-upload"] + ' '+this.state.hideFile}
                            />
                            </MuiThemeProvider>
                        </div>
                    <MuiThemeProvider>
                        <RaisedButton
                            label="Upload files ..."
                            labelPosition="before"
                            className={styles["btn-upload"] + ' '+ this.state.hideFileScreenshoots}
                        >
                            <FileUpload
				                
                                accept={fileTypes}
                                multiple={true}
                                onChange={this.onFilePathChange}
                                className={styles["file-input"]}
                            />
                            
                        </RaisedButton>
                    </MuiThemeProvider> */}
                    
                        <div className={styles["list"]}>
                            {list}
                        </div> 
                    </div>                 
                                       
                </div>
            </div>
        );
    }
}

Screenshots.propTypes = {
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
        hideFileScreenshoots: state.UpsertProjectReducer.hideFileScreenshoots,
        hideFormScreenshoots: state.UpsertProjectReducer.hideFormScreenshoots
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screenshots);
