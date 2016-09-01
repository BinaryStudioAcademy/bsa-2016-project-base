import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, TextInput, TextArea, FileUpload } from '../../../common/';
import styles from './styles/Techs.sass';

class Techs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techName: '',
            techVersion: '',
            techDescription: '',
            addBtnEnabled: false
        }
        this.addTechToProject = this.addTechToProject.bind(this);
        this.removeTechFromProject = this.removeTechFromProject.bind(this);
        this.addNewTechToProject = this.addNewTechToProject.bind(this);
        this.removeNewTechFromProject = this.removeNewTechFromProject.bind(this);
        this.onTechNameChange = this.onTechNameChange.bind(this);
        this.onTechVersionChange = this.onTechVersionChange.bind(this);
        this.onTechDescriptionChange = this.onTechDescriptionChange.bind(this);
        this.onTechLogoChange = this.onTechLogoChange.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.isAllFilled(newProps);
    }
    isAllFilled(newProps){
        const {techName, techVersion, techDescription} = this.state;
        const {iconLoaded} = newProps || this.props;
        if (techName != '' && techName != '' && techDescription != '' && iconLoaded) {
            this.setState({
                addBtnEnabled: true
            });
        } else {
            this.setState({
                addBtnEnabled: false
            });
        }
        console.log('addBtnEnabled ', this.state.addBtnEnabled);

    }
    onTechNameChange(e){
        this.setState({
            techName: e.target.value
        });
        this.isAllFilled();
    }
    onTechVersionChange(e){
        this.setState({
            techVersion: e.target.value
        });
        this.isAllFilled();
    }
    onTechDescriptionChange(e){
        this.setState({
            techDescription: e.target.value
        });
        this.isAllFilled();
    }
    onTechLogoChange(e){
        console.log('onTechLogoChange ',e.target.value);
        const file = e.target.files[0];
        if (file) {
            this.props.uploadIcon(file);
        }
    }
    addTechToProject(e, techId) {
        console.log('addTechToProject ',techId);
        if (techId)  this.props.addTechToProject(techId);
    }
    removeTechFromProject(e, techId) {
        console.log('removeTechFromProject ',techId);
        if (techId) this.props.removeTechFromProject(techId);
    }
    addNewTechToProject(e) {
        const {techName, techVersion, techDescription} = this.state;
        const { techIcon } = this.props;
        const newTech = {
            techName,
            techVersion,
            techDescription,
            techAvatar: techIcon.path
        }
        this.props.postTech(newTech);
        this.state = {
            techName: '',
            techVersion: '',
            techDescription: ''
        }
        const fileInput = document.querySelector('#tech-icon');
        fileInput.value = '';


    }
    removeNewTechFromProject(e, tech) {
        if (tech) this.props.removeNewTechFromProject(tech);
    }

    render(){
        const { technologies, iconLoaded, techIcon, techIconError, initialTechnologies, predefinedTechnologies } = this.props;
        if(technologies!= null && initialTechnologies == false) {
            //alert("AGA!");
            this.props.initialStateTechnologies(technologies, predefinedTechnologies);
        }
        const allUnUsedTechnologies = predefinedTechnologies.map( tech => {
            if (!tech.inProject) {
                return (
                    <div key={tech._id}>
                        <img src={tech.techAvatar} alt="tech logo"/>
                        <span>{tech.techName} {tech.techVersion}</span>
                        <span>{tech.techDescription}</span>
                        <Button className={styles["btnIcon"]} onClick={(e) => this.addTechToProject(e, tech._id)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </Button>
                    </div>
                );
            }
        });
        const usedTechnologies = predefinedTechnologies.map( (tech, index) => {
            if (tech.inProject) {
                return (
                    <div key={tech._id}>
                        <img src={tech.techAvatar} alt="tech logo"/>
                        <span>{tech.techName} {tech.techVersion}</span>
                        <span>{tech.techDescription}</span>
                        <Button onClick={(e) => this.removeTechFromProject(e, tech._id)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </Button>
                    </div>
                );
            }

        });

        return (
            <div id={styles['techs-list']}>
                <div className={styles['tech-name']}>
                    <TextInput
                        value={this.state.techName}
                        label='Name *'
                        placeholder='Type tecnology name'
                        onChange={this.onTechNameChange}
                    />
                    <TextInput
                        value={this.state.techVersion}
                        label='Version *'
                        placeholder='Type tecnology version'
                        onChange={this.onTechVersionChange}
                    />
                    <TextArea
                        value={this.state.techDescription}
                        label='Description *'
                        placeholder='Type tecnology description here'
                        onChange={this.onTechDescriptionChange}
                    />
                    <FileUpload
                        id={'tech-icon'}
                        multiple={false}
                        accept='image/jpeg,image/png,image/gif'
                        onChange={this.onTechLogoChange}
                        error={techIconError}
                    />
                    {iconLoaded && <img src={techIcon.path} alt="tech icon"/>}
                    <Button
                        value="Add"
                        disabled = {!this.state.addBtnEnabled}
                        onClick={this.addNewTechToProject}
                    />

                </div>

                <div>
                    <div className={styles['list-container']}>
                        All technologies:
                        <div className={styles['list']}>
                            {allUnUsedTechnologies}
                        </div>
                    </div>

                    <div className={styles['list-container']}>
                        Technologies in project:
                        <div className={styles['list']}>
                            {usedTechnologies}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        technologies: state.EditProjectReducer.technologies,
        predefinedTechnologies: state.EditProjectReducer.predefinedTechnologies,
        initialTechnologies: state.EditProjectReducer.initialTechnologies,
        techIconError: state.EditProjectReducer.techIconError,
        iconLoaded: state.EditProjectReducer.iconLoaded,
        techIcon: state.EditProjectReducer.techIcon
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Techs);