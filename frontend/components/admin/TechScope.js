import React, { Component, PropTypes } from 'react';

class TechScopeTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="techScopeTab">
	    		<h2>Add/Edit Technology Scopes</h2>
	    	</div>
	    )
	}
};

/*TechScopeTab.propTypes = {
	tech: PropTypes.array.isRequired,
  	addTechScope: PropTypes.func.isRequired,
  	removeTechScope: PropTypes.func.isRequired
};*/


export default TechScopeTab;
