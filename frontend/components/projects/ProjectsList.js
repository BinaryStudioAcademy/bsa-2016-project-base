import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './projects.sass';
import Tech from "./../project-summary/technologies/AddTechnologieView"
class ProjectsList extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div>
		    <div className={styles.alert}>Here you can find list of completed/required projects</div>
				<Tech
						techs={[
 	    				{_id: 1,techName:"ReactJs", techDescription:"WEB"},
 	    				{_id: 2,techName:"HTML", techDescription:"WEB"},
 	    				{_id: 3,techName:"Ruby", techDescription:"Backend"}
 					]}
						selectedTechsModified={(techs)=>{console.log(`new selected techs `, techs)}}
						addNewTech={tech=>console.log(`add tech to global`, tech)}/>
			</div>
	    )
	}
};

export default ProjectsList;

