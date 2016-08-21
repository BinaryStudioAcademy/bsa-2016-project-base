import React, { Component, PropTypes } from 'react';
import styles from './Rights.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateUserRight} from '../../../actions/admin/UsersRightsActions';
import FaChecked from 'react-icons/lib/fa/check-square-o';
import FaNotChecked from 'react-icons/lib/fa/square-o';

class RightsUsersListItem extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
 		let item = this['props'].usersRights['current'].users[this.props['data-id']],
 		checkbox = React.createElement((item['isOwner'] ? FaChecked:FaNotChecked),{
			size: 30,
			style:{
			    cursor:'pointer',
			   'padding-right': 10,
			    color: (item['isOwner'] ? '#2ECC71' : '#FC5A5A')
			},onClick: ()=>{
				this.props.updateUserRight(this.props['data-id'],!item['isOwner']);
			}
 		});

 		return (<div>
 			<div>
 				{checkbox}
 				<span> 
 					{item['userName'] + " " + item['userSurname']}
 				</span>		
 			</div>
 			<div>
 				Position:
 				<span>{item['position']}</span>
 			</div>	
 		</div>);
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    	updateUserRight: updateUserRight
    }, dispatch);
}

function mapStateToProps(state) {
    return {usersRights: state['UsersRightsReducer']};
}

const RightsUsersListItemConnected = connect(mapStateToProps, mapDispatchToProps)(RightsUsersListItem);
export default RightsUsersListItemConnected;
