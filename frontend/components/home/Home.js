import React, { Component } from 'react';
import styles from './home.sass';

class Home extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.alert}>Welcome Home!</div>
	    )
	}
};

export default Home;