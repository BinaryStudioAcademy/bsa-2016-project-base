import React, { Component } from 'react';
import styles from './not-found.sass';

class NotFound extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>404: Sorry, that page does not exist! </div>
	    )
	}
};

export default NotFound;
