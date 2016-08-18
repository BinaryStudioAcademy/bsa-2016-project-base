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
    }
    render() {
        const {files} = this.props.store;
        const list = files.map( (file, index) => {
            return (
                <File
                    key={index}
                    thumb={file.thumb}
                    url={file.url}
                    name={file.name}
                />
            );
        });
        return (
            <div id={styles["attachments"]}>
                <fieldset>
                    <legend>Attachments</legend>
                    <FileUpload
                        onChange={this.onTechLogoChange}
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
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachments);