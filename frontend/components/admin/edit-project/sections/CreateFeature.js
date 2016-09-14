import React, { Component, PropTypes } from 'react';
import { Button, TextInput, Editor, RaisedButtonUITags } from '../../../common/';
import styles from '../../project/sections/styles/CreateFeature.sass';

class CreateFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureName: '',
            descriptionHTMLText: ''
        };
        this.setNewFeatureName = this.setNewFeatureName.bind(this);
        this.setNewFeatureDescription = this.setNewFeatureDescription.bind(this);

    }
    setNewFeatureName(e) {
        this.setState({
            featureName: e.target.value.trim()
        })
    }
    setNewFeatureDescription(html) {
        this.setState({
            descriptionHTMLText: html
        });

    }

    render() {
        const {isActive, onClose, onSave} = this.props;
        const {featureName, descriptionHTMLText} = this.state;
        return (

            <div className={styles["modal"]} >
                <div className="modal-content">
                    <div className="modal-header">
                     <Button
                            className={styles["btnIcon"] + ' ' + styles["btnClose"]}
                            label='Close'
                            onClick={onClose}
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                        <h2>Create Feature</h2>
                    </div>
                    <div className="modal-body">

                        <Editor
                            handleChange={this.setNewFeatureDescription}
                            initialContent={descriptionHTMLText}
                        />
                    </div>
                    <div className="modal-footer">
                        <RaisedButtonUITags
                            //className={styles.btnCreate}
                            label="Save"
                            onClick={onSave && (() => onSave(descriptionHTMLText))}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

CreateFeature.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default CreateFeature;