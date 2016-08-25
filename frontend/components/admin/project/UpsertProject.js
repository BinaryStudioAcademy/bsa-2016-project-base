import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead, Button } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Features from './sections/Features';
import Attachments from './sections/Attachments';

class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	    this.createProject = this.createProject.bind(this);
	}
	componentDidMount() {
		this.props.getPredefinedData();
	}
	createProject(e) {
		console.log('createProject');
	}
	
 	render() {
	    return (
	    	<div>
	    		<Inputs/>
        		<br/>
        		<Features/>
        		<br/>
        		<Tags/>
        		<br/>
        		<Techs/>
        		<br/>
        		<UsersList/>
        		<br/>
        		<Attachments/>
        		<br/>
        		<Button
                    value="Create project"
                    onClick={this.createProject}
                />
	    	</div>
	    )
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpsertProject);