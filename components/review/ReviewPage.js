import React, { Component } from 'react';
import styles from '../sass/project.sass';

class ReviewPage extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Request project review</div>
	    )
	}
};

export default ReviewPage;
