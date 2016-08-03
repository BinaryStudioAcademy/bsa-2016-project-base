import React, { Component } from 'react';
import styles from './review.sass';

class Review extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Request project review</div>
	    )
	}
};

export default Review;
