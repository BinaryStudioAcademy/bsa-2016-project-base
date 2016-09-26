/* general */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* components */
import Item from './RightsListItem';

/* styles */
import styles from './Rights.sass';

class RightsUsersList extends React.Component {

	constructor(props) {
	    super(props);
	}

 	render() {
 		let items = [];
 		for(let i in this.props['usersRights'].current['users']) 
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

