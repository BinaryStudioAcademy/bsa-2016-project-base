import React, { Component, PropTypes } from 'react';
import RightsToolbar from './RightsToolbar';
import RightsUsersList from './RightsUsersList';
import styles from './Rights.sass';

class RightsTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles['rights-container']}>
	    		<RightsToolbar />
				<RightsUsersList />
			</div>
	    )
	}
};
export default RightsTab;
