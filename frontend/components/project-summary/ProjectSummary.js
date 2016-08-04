import React, { Component } from 'react';
import styles from './project-summary.sass';

class ProjectSummary extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Here you can read project summary</div>
	    )
	}
};

export default ProjectSummary;
