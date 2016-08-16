import React, { Component, PropTypes } from 'react';

import InsertSection from './InsertSection'
import SectionsToolBar from './SectionsToolBar'
import SectionsList from './SectionsList'

import styles from './styles/Sections.sass';
class SectionsTab extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="Sections">
				<SectionsToolBar />
				<SectionsList />
				<InsertSection/>
			</div>
		)
	}
}
/*
 <FeaturesToolBar />
 <FeaturesList />
 */

/*FeaturesTab.propTypes = {
 features: PropTypes.array.isRequired,
 addFuture: PropTypes.func.isRequired
 };*/

export default SectionsTab;