import React, { Component, PropTypes } from 'react';

class RightsTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="rightsTab">
	    		<h3>Edit Users Rigths</h3>
	    	</div>
	    )
	}
};

/*RightsTab.propTypes = {
	users: PropTypes.array.isRequired,
  	projects: PropTypes.array.isRequired,
  	saveChanges: PropTypes
};*/


export default RightsTab;
