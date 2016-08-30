import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './projects.sass';

class ProjectsList extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div>
			    <div className={styles.alert}>Here you can find list of completed/required projects!
			    	<Link to={"/project-view"}><u> One Project Viev</u></Link>
			    </div>
		    </div>
	    )
	}
};

export default ProjectsList;

