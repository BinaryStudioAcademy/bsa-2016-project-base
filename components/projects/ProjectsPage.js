import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../sass/projects.sass';

class ProjectsPage extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div>
		    <div className={styles.alert}>Here you can find list of completed/required projects</div>
	   		</div>
	    )
	}
};

export default ProjectsPage;

