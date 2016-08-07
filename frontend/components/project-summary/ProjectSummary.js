import React, { Component } from 'react';
import Users from './users-component/';
import styles from './project-summary.sass';
import { Grid, Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

class ProjectSummary extends Component {

 	render() {
		let a = 2;
	    return (
			<Row>
				<Col xs={12} sm={6} >
					<DetailsFeatures />
				</Col>
				<Col xs={12} sm={6} >
					<DetailsFeatures />
				</Col>
			</Row>
	    )
	}
}

export default ProjectSummary;
