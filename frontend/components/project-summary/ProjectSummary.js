import React, { Component } from 'react';
import styles from './project-summary.sass';
import { Grid, Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

class ProjectSummary extends Component {

 	render() {
		let a = 2;
	    return (
			<div>
	    		<div>Here you can read project summary
				</div>
				<Grid>
					<Row>
						<Col sm={6}>
							<DetailsFeatures />
						</Col>
						<Col sm={6}> lala </Col>
					</Row>
				</Grid>
			</div>
	    )
	}
}

export default ProjectSummary;
