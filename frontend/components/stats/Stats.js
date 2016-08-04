import React, { Component } from 'react';
import styles from './stats.sass';

class Stats extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Display some project stats</div>
	    )
	}
};

export default Stats;
