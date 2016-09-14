import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, TextInput, TextArea, FileUpload } from '../../../common/';
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
    }
    onFilePathChange(e) {
        console.log('onFilePathChange url', e.target.value);
        const files = e.target.files;
        console.log(e.target.files.length);
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                this.props.uploadFile(files[i],'screenshot');
            }
            e.target.value = '';
        }
    }
    removeFile(e, name) {
        console.log('removeFile ',name);
        this.props.removeFile(name);
    }
    render() {
        const {files} = this.props;
        const list = files.map( (file, index) => {
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
                        <MuiThemeProvider>
                            <RaisedButton
                                label="Upload screenshots"
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
        files: state.EditProjectReducer.files
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screenshots);
