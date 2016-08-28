import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextArea, FileUpload } from '../../../common/';
import styles from './styles/Techs.sass';

class Techs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	techName: '',
            techVersion: '',
            techDescription: '',
            techAvatar: ''
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
    onTechNameChange(e){
        this.setState({
            techName: e.target.value.trim()
        });
        
    }
    onTechVersionChange(e){
        this.setState({
            techVersion: e.target.value.trim()
        });
    }
    onTechDescriptionChange(e){
        this.setState({
            techDescription: e.target.value.trim()
        });
    }
    onTechLogoChange(e){
        console.log('onTechLogoChange ',e.target.value);
        this.setState({
            techAvatar: e.target.value
        });
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
    	const tech = this.state;
		//this.props.addNewTechToProject(tech);
        this.props.postTech(tech);
		this.state = {
            techName: '',
            techVersion: '',
            techDescription: '',
            techAvatar: ''
        }
    }
    removeNewTechFromProject(e, tech) {
    	if (tech) this.props.removeNewTechFromProject(tech);
    }

    render(){
    	const { technologies } = this.props;
    	const predefinedTags = technologies.map( tech => {
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
    	const usedTags = technologies.map( (tech, index) => {
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
                <fieldset>
                    <legend>Technologies</legend>
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
                            onChange={this.onTechLogoChange}
                        />
    		        	<Button 
                            value="Add" 
                            onClick={this.addNewTechToProject}
                        />  	
        			</div>
        			
    	    		<div>
    	    			<div className={styles['list-container']}>
                        All technologies:
                        <div className={styles['list']}>
                         	{predefinedTags}
                        </div>
    	                </div>
    	               
    	                 <div className={styles['list-container']}>
    	                     Technologies in project:
    	                     <div className={styles['list']}>
    	                        {usedTags}
    	                     </div>
    	                </div>
    	    		</div>
                </fieldset>
            </div>
    	);
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        technologies: state.UpsertProjectReducer.technologies
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Techs);