import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextArea, FileUpload } from '../../../common/';
import File from './File';
import styles from './styles/Screenshots.sass';

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
                        <FileUpload
							className={styles["upload-container"]}
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
        files: state.UpsertProjectReducer.files
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screenshots);
