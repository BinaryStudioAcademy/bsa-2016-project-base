import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead, Button } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Attachments from './sections/Attachments';

class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	}
	
 	render() {
	    return (
	    	<div>
	    		<Inputs/>
        		<br/>
        		<Tags/>
        		<br/>
        		<Techs/>
        		<br/>
        		<UsersList/>
        		<br/>
        		<Attachments/>
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