import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import Inputs from './sections/Inputs';
import Button from '../../common/Button'
import TabPanel from '../../common/tabs/TabPanel';
import TabBody from '../../common/tabs/TabBody';
import TabHead from '../../common/tabs/TabHead';
import UsersList from './UsersList';




class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	   	
	}
	
	
 	render() {
 		

 		

 		/*const project = {
			_id:"57acc61ab781f506fe6ca72a",
			projectName:"First Web-project",
			timeBegin:"2013-06-09",
			timeEnd:"2014-06-09",
			condition: "In progress"
		};*/

	    return (
	    	<div>
	    		<Inputs data = {{}}/>
	    		<TabPanel activeIndex={0}>
	        		<TabHead index={0}>
	        			<Button id="ok" value="Tags"/>
	        		</TabHead>
	        		<TabBody index={0} label="Tags">
	        			Hello Tags Tab!
	        		</TabBody>
	        		<TabHead index={1}>
	        			<Button id="ok" value="Features"/>
	        		</TabHead>
	        		<TabBody index={1} label="Features">
	        			Hello Features Tab!
	        		</TabBody>
        		</TabPanel>
        		<UsersList 
        			
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