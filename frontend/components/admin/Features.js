import React, { Component, PropTypes } from 'react';

class FeaturesTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="featuresTab">
	    		<h2>Add/Edit Features</h2>
	    	</div>
	    )
	}
};

/*FeaturesTab.propTypes = {
	features: PropTypes.array.isRequired,
  	addFuture: PropTypes.func.isRequired
};*/


export default FeaturesTab;
