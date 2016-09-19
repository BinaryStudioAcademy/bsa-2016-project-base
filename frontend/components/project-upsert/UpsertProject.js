import React, { Component } from 'react';
import styles from './upsert-project.sass';

class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Here you can add/update project</div>
	    	
	    )
	}
};

export default UpsertProject;
