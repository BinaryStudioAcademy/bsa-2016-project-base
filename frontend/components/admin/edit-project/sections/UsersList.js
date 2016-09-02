import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, DropDown } from '../../../common/';
import DeveloperItem from './DeveloperItem';
import UserItem from './UserItem';
import styles from './styles/UsersList.sass';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.addUserToProject = this.addUserToProject.bind(this);
        this.removeUserFromProject = this.removeUserFromProject.bind(this);
        this.onOwnershipChange = this.onOwnershipChange.bind(this);
    }
    addUserToProject(e, userId) {
        console.log('addUserToProject ',userId);
        if (userId)  this.props.addUserToProject(userId);
    }
    removeUserFromProject(e, userId) {
        console.log('removeUserFromProject ',userId);
        if (userId) this.props.removeUserFromProject(userId);
    }
    onOwnershipChange(e, userId) {
        console.log('onOwnershipChange ',userId);
        const checked = e.target.checked;
        if (userId) this.props.changeOwnership(userId, checked);
    }
    render() {
        const { users, owners, predefinedUsers, initialUsers } = this.props.store;
        if(users!= null && initialUsers == false) {
            //alert("AGA!");
            this.props.initialStateUsers(users, predefinedUsers, owners);
        }
        let opts = [];
    	const usersList = predefinedUsers.map(user => {
            if (!user.inProject) {
                return (
                     <UserItem 
                        user={user} 
                        key={user._id} 
                        onAddClick={this.addUserToProject}
                    />
                );
            }
            
        });

        const developersList = predefinedUsers.map(user => {
            if (user.inProject) {
                return (
                    <DeveloperItem 
                        user={user} 
                        key={user._id} 
                        onRemoveClick={this.removeUserFromProject}
                        onCheckboxChange={this.onOwnershipChange}
                    />
                );
            } 
        });

        return (
            <div id={styles['user-list_ed']}>
                <div className={styles['list-container']}>
                    All users:
                    <div className={styles['list']}>
                     	{usersList}
                    </div>
                </div>
               
                 <div className={styles['list-container']}>
                     Project developers:
                     <div className={styles['list']}>
                        {developersList}
                     </div>
                </div>
            </div>
        );
    }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.EditProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);