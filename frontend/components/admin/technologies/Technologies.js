import React, { Component, PropTypes } from 'react';

class TechnologiesTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="technologiesTab">
	    		<h2>Add/Edit Tags</h2>
	    	</div>
	    )
	}
};

/*TagsTab.propTypes = {
	tags: PropTypes.array.isRequired,
  	addTag: PropTypes.func.isRequired,
  	removeTag: PropTypes.func.isRequired
};*/


export default TechnologiesTab;
