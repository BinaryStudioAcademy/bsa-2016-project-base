import React, { Component, PropTypes } from 'react';
import styles from './Rights.sass';
import Item from './RightsListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RightsUsersList extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
 		let items = [];
 		for(var i in this.props['usersRights'].current['users']) 
 			items.push(<Item data-id={i} key={i} />);
	    return (<div className={styles['rights-UsersList']}>{items}</div>)
	}
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {usersRights: state['UsersRightsReducer']};
}

const RightsUsersListConnected = connect(mapStateToProps, mapDispatchToProps)(RightsUsersList);
export default RightsUsersListConnected;

