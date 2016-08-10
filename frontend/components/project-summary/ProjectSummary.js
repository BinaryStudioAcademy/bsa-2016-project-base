import React, { Component } from 'react';
import UsersList from './users-component/users_list';
console.log(UsersList);
import styles from './project-summary.sass';
import { Grid, Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

const projectId = '57a315af0b7a3bc58341d3bc';

class ProjectSummary extends Component {

 	render() {
	    return (
	    	<div>
				<Row>
					<Col xs={12} sm={6} >
						<DetailsFeatures projectId={projectId} />
					</Col>
					{/*<Col xs={12} sm={6} >*/}
						{/*<DetailsFeatures projectId={projectId} />*/}
					{/*</Col>*/}

				</Row>
				<UsersList />
			</div>
	    )
	}
}

export default ProjectSummary;
