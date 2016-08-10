import React, { Component } from 'react';
import Users from './users-component/';
import styles from './project-summary.sass';
import { Grid, Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

const projectId = '57a315af0b7a3bc58341d3bc';

class ProjectSummary extends Component {

 	render() {
	    return (
			<Row>
				<Col xs={12} sm={6} >
					<DetailsFeatures projectId={projectId} />
				</Col>
				{/*<Col xs={12} sm={6} >*/}
					{/*<DetailsFeatures projectId={projectId} />*/}
				{/*</Col>*/}
			</Row>
	    )
	}
}

export default ProjectSummary;
