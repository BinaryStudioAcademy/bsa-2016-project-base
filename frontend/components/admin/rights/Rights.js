import React, { Component, PropTypes } from 'react';
import RightsToolbar from './RightsToolbar'
import RightsUsersList from './RightsUsersList'

class RightsTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="rightsTab">
	    		<RightsToolbar />
				<RightsUsersList />
			</div>
	    )
	}
};

export default RightsTab;
