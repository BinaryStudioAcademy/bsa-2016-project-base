import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as actions from '../../actions/ReviewAction';
import EstimationStepper from './components/EstimationStepper';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  stepper: {
    iconColor: "#2ecc71",
    textColor: "#555"
  },
  raisedButton: {
      primaryColor: '#8D97A4'
    },
    textField: {
      focusColor: '#8D97A4'
    }
});

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
			<MuiThemeProvider muiTheme={muiTheme}>
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