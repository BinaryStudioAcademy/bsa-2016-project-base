import React, { Component, PropTypes } from 'react';
//var injectTapEventPlugin = require("react-tap-event-plugin");
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './review.sass';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/ReviewAction';
import { ProjectList } from './components';

//injectTapEventPlugin();
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
				<ProjectList
					projects = {projects}
					selectedProject={selectedProject}
					handleRequestChange={::this.handleRequestChange}
					getProject={this.props.getProject}
					project={project}
				/>
			</MuiThemeProvider>
	    )
	}
}

export default connect(
	state => ({review: state.ReviewReducer}),
	dispatch => bindActionCreators(actions, dispatch)
)(Review);