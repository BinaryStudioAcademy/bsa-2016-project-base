import React, { Component } from 'react';
import styles from './review.sass';
import ReduxWrapper from "./../home/search/ReduxWrapper"
class Review extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div>Request project review
			<ReduxWrapper/></div>

	    )
	}
};

export default Review;
