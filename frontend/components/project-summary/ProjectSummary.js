import React, { Component } from 'react';
import Users from './users-component/';
import styles from './project-summary.sass';
import { Grid, Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

class ProjectSummary extends Component {

 	render() {
		let a = 2;
	    return (
            	<div>
	    	    	<div className={styles.alert}>Here you can read project summary</div>
                	<Users />
            	</div>
	    )
	}
}

export default ProjectSummary;
