import React, { Component } from 'react';
import styles from '../sass/stats.sass';

class StatsPage extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Display some project stats</div>
	    )
	}
};

export default StatsPage;
