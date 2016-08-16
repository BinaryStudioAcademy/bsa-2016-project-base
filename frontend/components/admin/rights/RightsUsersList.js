import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUsers} from '../../../actions/admin/UsersRightsActions';



class RightsUsersList extends Component {
	constructor(props) {
	    super(props);
	}

	componentWillMount() {
       this.props.fetchUsers("57acc61ab781f506fe6ca72a",{
       		userName: "J"
       });

    }
 	render() {
 		console.log(this.props.usersRights);
	    return (
	    	<div className=" rightsUsersList">
	    	</div>
	    )
	}
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUsers:fetchUsers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        usersRights: state['UsersRightsReducer']
    };
}
const RightsUsersListConnected = connect(mapStateToProps, mapDispatchToProps)(RightsUsersList);

export default RightsUsersListConnected;
