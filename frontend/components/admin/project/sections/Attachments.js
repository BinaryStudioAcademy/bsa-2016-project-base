import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextArea, FileUpload } from '../../../common/';
import File from './File';
import styles from './styles/Attachments.sass';

class Attachments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileInput: null
        }
        this.loadAttachment = this.loadAttachment.bind(this);
        this.onFilePathChange = this.onFilePathChange.bind(this);
        this.removeFile = this.removeFile.bind(this);
    }
    onFilePathChange(e) {
        console.log('onFilePathChange url', e.target.value);
        /*this.setState({
            file:  e.target.files[0]
        })*/
        
        this.setState({
            fileInput:  e.target
        })
        const file = e.target.files[0];
        if (file) {
            this.props.uploadFile(file);

            e.target.value = '';
        }
        
    }
    loadAttachment(e) {
        /*console.log('loadAttachment ');
        const {file} =  this.state;
        if (file) {
            this.props.uploadFile(file);
            this.setState({
                file: null
            });
        }

            <Button
                        value="Add"
                        onClick={this.loadAttachment}
                    />


        */
    }
    removeFile(e, name) {
        console.log('removeFile ',name);
        this.props.removeFile(name);
    }
    render() {
        const {files} = this.props;
        const list = files.map( (file, index) => {
            return (
                <File
                    key={index}
                    thumb={file.thumb}
                    url={file.url}
                    name={file.name}
                    onClick={this.removeFile}
                />
            );
        });
        return (
            <div id={styles["attachments"]}>
                <fieldset>
                    <legend>Attachments</legend>
                    <FileUpload
                        accept="image/jpeg,image/png,image/gif,application/xml"
                        onChange={this.onFilePathChange}
                    />
                    
                    <div className={styles["list"]}>
                        {list}
                    </div>
                    
                </fieldset>
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
        files: state.UpsertProjectReducer.files
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);