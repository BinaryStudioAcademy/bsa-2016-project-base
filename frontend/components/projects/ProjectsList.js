import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './projects.sass';
import Tech from "./../project-summary/technologies/AddTechnologieView"
import BasicTech from "./../project-summary/technologies/BasicTechnologieView"
class ProjectsList extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div>
		    <div className={styles.alert}>Here you can find list of completed/required projects</div>
				<div>
					<div style={{width:"500px", float:"left"}}>
						<Tech
								techs={[
 	    						{_id: 1,techName:"ReactJs", techDescription:"WEB"},
 	    						{_id: 2,techName:"HTML", techDescription:"WEB"},
 	    						{_id: 3,techName:"Ruby", techDescription:"Backend"}
 							]}
								selectedTechsModified={(techs)=>{console.log(`new selected techs `, techs)}}

								failedLoadGlobalTechs={(err)=>console.log(`failed load techs from server cos ${err}`)}
								startLoadGlobalTechs={()=>console.log(`start load global techs`)}
								successfullyLoadGlobalTechs={()=>console.log(`global techs loaded successfully`)}

								failedAddNewTech={(err=>console.log(`failed add new tech cos ${err}`))}
								startAddNewTech={()=>console.log(`start add new tech`)}
								successfullyAddNewTech={()=>console.log(`successfully add new tech`)}/>
					</div>
					<div style={{width:"500px",float:"left"}}>
						<BasicTech
								techs={[
 	    					{_id: 1,techName:"ReactJs", techDescription:"WEB"},
 	    					{_id: 2,techName:"HTML", techDescription:"WEB"},
 	    					{_id: 3,techName:"Ruby", techDescription:"Backend"}
 						]}
						/>
					</div>
					<div style={{clear:"both"}}></div>
				</div>


			</div>
	    )
	}
};

export default ProjectsList;

