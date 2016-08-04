import React, { Component, PropTypes } from 'react';

class TechTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className="techTab">
	    		<h2>Add/Edit Technologies</h2>
	    	</div>
	    )
	}
};

/*TechTab.propTypes = {
	tech: PropTypes.array.isRequired,
  	addTech: PropTypes.func.isRequired,
  	removeTech: PropTypes.func.isRequired
};*/


export default TechTab;
