import React, { Component } from 'react';
import Users from './users-component/';
import styles from './project-summary.sass';

class ProjectSummary extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
            <div>
	    	    <div className={styles.alert}>Here you can read project summary</div>
                <Users />
            </div>
	    )
	}
};

export default ProjectSummary;
