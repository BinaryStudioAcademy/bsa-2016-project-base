import React, { Component } from 'react';
import UsersList from './users-component/users_list';
import styles from './project-summary.sass';
import { Row, Col } from 'react-bootstrap';
import DetailsFeatures from './features/DetailsFeatures';

const features = [
	{
		"_id": "57a237d2fc13ae319e002718",
		"featureName": "9176",
		"section": {
			"_id": "57adb68acc82da9f31e34697",
			"name": "name568",
			"description": "desc6925"
		},
		"featureOrder": "Waited",
		"isNecessary": true,
		"descriptionHTMLText": 'main html desc',
		"descriptionText": 'main desc',
		"created": "10/08/2015",
		"isImplemented": false,
		"childFeatures": ["57a237d2fc13ae319e00271a"],
		"isItSubFeature": false
	},
	{
		"_id": "57a237d2fc13ae319e00271a",
		"featureName": "1263",
		"section": {
			"_id": "57adb68acc82da9f31e34697",
			"name": "name568",
			"description": "desc6925"
		},
		"featureOrder": "Necesary",
		"isNecessary": true,
		"created": "08/07/2015",
		"descriptionHTMLText": 'sub html desc',
		"descriptionText": 'sub desc',
		"isImplemented": true,
		"childFeatures": null,
		"isItSubFeature": true
	}
];

class ProjectSummary extends Component {

 	render() {
	    return (
	    	<div>
				<Row>
					<Col xs={12} sm={6} >
						<DetailsFeatures features={features} />
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
