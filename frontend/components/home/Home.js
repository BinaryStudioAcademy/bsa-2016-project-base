import React, { Component } from 'react';
import styles from './home.sass';
import { Button } from 'react-bootstrap';

class Home extends Component {
	constructor(props) {
	    super(props);
	    this.onClick = this.onClick.bind(this);
	}

	onClick() {
		console.log('Click');
	}

 	render() {
	    return (
	    	<div>
	    		<div className={styles.alert}>Welcome Home!</div>
	    	  <Button bsStyle="primary" bsSize="large" onClick={this.onClick}>OK</Button>
	    	</div>
	    	
	    )
	}
};

export default Home;