import React, { Component, PropTypes } from 'react';
import InsertTabs from './InsertTabs';
//import { Button, FieldGroup, ButtonToolbar, FormGroup, ControlLabel, FormControl, Col, Form, Tabs, Tab } from 'react-bootstrap';
import styles from './styles/Features.sass';
class FeaturesTab extends Component {

	render() {
		return (

			<InsertTabs className={styles['featureComponent']}/>
		)
	}
}


/*FeaturesTab.propTypes = {
 features: PropTypes.array.isRequired,
 addFuture: PropTypes.func.isRequired
 };*/


export default FeaturesTab;