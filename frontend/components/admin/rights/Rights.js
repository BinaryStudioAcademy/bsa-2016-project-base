/* general */
import React  from 'react';

/* components */
import RightsToolbar from './RightsToolbar';
import RightsUsersList from './RightsUsersList';

/* styles */
import styles from './Rights.sass';

export default class RightsTab extends React.Component {

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