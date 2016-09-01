import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as actions from '../../actions/ReviewAction';
import EstimationStepper from './components/EstimationStepper';

class Review extends Component {

	componentDidMount() {
		this.props.getAllProjects();
	}

	handleRequestChange = (event, index) => {
		this.props.setSelectedProject(index);
	};

 	render() {

 		const { projects, selectedProject, project } = this.props.review;

	    return (
			<MuiThemeProvider>
				<EstimationStepper
					projects = {projects}
					selectedProject={selectedProject}
					handleRequestChange={::this.handleRequestChange}
					getProject={this.props.getProject}
					project={project}
				/>
			</MuiThemeProvider>
	    );
	}
}

export default connect(
	state => ({review: state.ReviewReducer}),
	dispatch => bindActionCreators(actions, dispatch)
)(Review);