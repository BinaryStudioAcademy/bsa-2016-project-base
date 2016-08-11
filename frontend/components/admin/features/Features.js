import React, { Component, PropTypes } from 'react';

import InsertTabs from './InsertTabs';
import FeaturesToolBar from './FeaturesToolBar'
import FeaturesList from './FeaturesList'

import styles from './styles/Features.sass';
class FeaturesTab extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="Features">
				<FeaturesToolBar />
				<FeaturesList />
				<InsertTabs className={styles['featureComponent']}/>
			</div>
		)
	}
}

/*FeaturesTab.propTypes = {
 features: PropTypes.array.isRequired,
 addFuture: PropTypes.func.isRequired
 };*/

export default FeaturesTab;