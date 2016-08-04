import React, { Component, PropTypes } from 'react';
import Technologies from "./technologies/Technologies"
export default class TechTab extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
				<div className="technologiesTab">
					<h2>Add/Edit Techs</h2>
					<Technologies/>
				</div>
		)
	}
};
