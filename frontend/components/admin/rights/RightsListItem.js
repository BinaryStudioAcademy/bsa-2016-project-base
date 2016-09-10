/* general */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* dependencies */
import { DEFAULT } from '../../../constants/Api';
import {updateUserRight} from '../../../actions/admin/UsersRightsActions';

/* components */
import CheckBox from '../../common/CheckBox-ui.js';

/* styles */
import styles from './Rights.sass';

class RightsUsersListItem extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	defaultImage: DEFAULT + "user.png"
	    }
	}

 	render() {
 		let item = this['props'].usersRights['current'].users[this.props['data-id']];
 		return (<div>
 			<div className={styles['image-Container']}>
 				<img src={this.state.defaultImage
                    /*(item.avatar ? item.avatar : this.state.defaultImage)*/
                } />
 			</div>
 			<div className={styles['description-Container']}>
	 			<div>
	 				<CheckBox checked={item.isOwner} onCheck={(e)=>{
	 					this.props.updateUserRight(this.props['data-id'],e.target['checked']);
	 				}}/>
	 				<span>{item['userName'] + ' ' + item['userSurname']}</span>		
	 			</div>
	 			<div>
	 				Position:
	 				<span>{item['position']}</span>
	 			</div>	
 			</div>
 		</div>);
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateUserRight}, dispatch);
}

function mapStateToProps(state) {
    return {usersRights: state['UsersRightsReducer']};
}

const RightsUsersListItemConnected = connect(mapStateToProps, mapDispatchToProps)(RightsUsersListItem);
export default RightsUsersListItemConnected;
