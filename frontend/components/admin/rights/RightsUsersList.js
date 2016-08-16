import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUsers} from '../../../actions/usersRightsActions';



class RightsUsersList extends Component {
	constructor(props) {
	    super(props);
	}

	componentWillMount() {
   this.props.fetchUsers("57a315af0b7a3bc58341d3bc");

 }
 	render() {
	    return (
	    	<div className=" rightsUsersList">

fffff

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
