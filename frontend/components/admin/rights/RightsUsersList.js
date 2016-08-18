import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateUserRight, fetchUsers} from '../../../actions/admin/UsersRightsActions';

class RightsUsersList extends Component {
	constructor(props) {
	    super(props);
	}
	componentWillMount(){
	}
 	render() {
 		let items = [];
 		var users = this.props['usersRights'].current['users'];
 		for(var i in users) items.push(
 			<Checkbox checked={users[i].isOwner} data-id={i} key={i} onChange={(e)=>{
 				this.props.updateUserRight(e.target.getAttribute('data-id'),e.target.checked);
 			}}>{users[i].userSurname +' '+ users[i].userName}</Checkbox>);
	    return (<div className="rightsUsersList">{items}</div>)
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    	updateUserRight: updateUserRight,
    	fetchUsers: fetchUsers
    }, dispatch);
}

function mapStateToProps(state) {
    return {usersRights: state['UsersRightsReducer']};
}

const RightsUsersListConnected = connect(mapStateToProps, mapDispatchToProps)(RightsUsersList);
export default RightsUsersListConnected;
