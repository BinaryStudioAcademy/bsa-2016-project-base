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
    	const predefinedTechs = technologies.map( tech => {
    		if (!tech.inProject) {
    			return (
    				<div key={tech._id} className={styles.techItem}>
                        {/*<img src={tech.techAvatar} alt="tech logo"/>*/}
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" alt="tech logo"/>
	    				</div>
                        <div className={styles.nameAndVers}>
                            <span>{tech.techName} {tech.techVersion}</span>
                            {/*<span>{tech.techDescription}</span>*/}
                        </div>
		    			<Button className={styles["btnIcon"]} onClick={(e) => this.addTechToProject(e, tech._id)}>
		            		<i className="fa fa-plus" aria-hidden="true"></i>
		            	</Button>
	            	</div>
    			);
    		}
    	});
    	const usedTechs = technologies.map( (tech, index) => {
    		if (tech.inProject) {
    			return (
                    <div key={tech._id} className={styles.techItem}>
                        {/*<img src={tech.techAvatar} alt="tech logo"/>*/}
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" alt="tech logo"/>
                        </div>
                        <div className={styles.nameAndVers}>
                            <span>{tech.techName} {tech.techVersion}</span>
                            {/*<span>{tech.techDescription}</span>*/}
                        </div>
                        <Button className={styles["btnIcon"]} onClick={(e) => this.removeTechFromProject(e, tech._id)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </div>
    			);
    		}
    		
    	});
    	
    	return (
    		<div id={styles['techs-list']}>
                <div className={styles.row}>
                    <div className={styles['list-container']}>
                        <header className={styles['user-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>All technologies</h3>
                            </div>
                        </header>
                        
                        <div className={styles['section-list1']}>
                                {predefinedTechs}
                        </div>
                        
                        
                    </div>

                    <div className={styles['list-container']}>
                        <header className={styles['user-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Technologies in project</h3>
                            </div>
                        </header>
                        <div className={styles['section-list1']}>
                                {usedTechs}
                        </div>
                    </div>
                </div>         

                <div className={styles['add-tech-block']}>
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