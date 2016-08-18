import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead, Button } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';


class UpsertProject extends Component {
	constructor(props) {
		 super(props);
	}
	
	render() {
		 return (
			<div>
				<Inputs />
				<TabPanel activeIndex={0}>
					<TabHead index={0}>
						<Button id="ok" value="Tags" />
					</TabHead>
					<TabBody index={0} label="Tags">
						Hello Tags Tab!
					</TabBody>
					<TabHead index={1}>
						<Button id="ok" value="Features" />
					</TabHead>
					<TabBody index={1} label="Features">
						Hello Features Tab!
					</TabBody>
				</TabPanel>
				<UsersList />
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