import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import {Button, TextInput, TextArea, FileUpload} from '../../../common/';
import File from './File';
import styles from './styles/Screenshots.sass';

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
        console.log('onFilePathChange url', e.target.value);
        const files = e.target.files;
        console.log(e.target.files.length);
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.props.uploadFile(files[i], 'screenshot');
            }
            e.target.value = '';
        }
    }

    removeFile(e, name) {
        console.log('removeFile ', name);
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
        this.props.uploadFileByLinkScreenshoots(this.state.fileLinkScreenshoots);
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
            <div id={styles["attachments"]}>
                <header>
                    <h2>Screenshots</h2>
                </header>
                <div className={styles.row}>
                    <div className={styles['field-container']}>
                        <div className="inputField">
                            <a href="javascript:void(0)"
                               onClick={this.setVisibleLinkForm}>{(this.state.hideFormScreenshoots === 'hidden') ? 'UploadByLink' : 'UploadByFile'}</a>
                        </div>
                        <div className={this.state.hideFormScreenshoots + " inputField"}>
                            <TextInput
                                label="File Link"
                                onChange={this.saveFileLink}
                                placeholder="File link"
                                value={this.state.fileLinkScreenshoots}
                            />
                            <input type="button"
                                   label='UploadByLink'
                                   onClick={this.uploadFileByLink}
                                   style={{display: 'block', marginTop: '20px'}}
                                   value='UploadByLink'
                            />
                        </div>
                        <FileUpload
                            className={this.state.hideFileScreenshoots + ' ' + styles["upload-container"]}
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
