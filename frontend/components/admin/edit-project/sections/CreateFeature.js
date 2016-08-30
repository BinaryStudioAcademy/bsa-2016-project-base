import React, { Component, PropTypes } from 'react';
import { Button, TextInput, Editor } from '../../../common/';
import styles from './styles/CreateFeature.sass';

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
                      <span className="close">
                        <Button value="Close" onClick={onClose}/>
                      </span>
                      <h2>Create Feature</h2>
                    </div>
                    <div className="modal-body">
                        
                        <Editor 
                            handleChange={this.setNewFeatureDescription}
                            initialContent={descriptionHTMLText}
                        />
                    </div>
                    <div className="modal-footer">
                        <Button 
                            value="Save"  
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