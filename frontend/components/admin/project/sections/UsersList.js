import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
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
        console.log('checked = ' + checked);
        console.log(e);
        console.log(e.target);
        if (userId) this.props.changeOwnership(userId, checked);
    }
    render() {
        const { users } = this.props.store;
        let opts = [];
    	const usersList = users.map(user => {
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

        const developersList = users.map(user => {
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
            <div id={styles['user-list']}>
                <div className={styles.row}>
                    <div className={styles['list-container']}>
                        <header className={styles['user-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>All users</h3>
                            </div>
                        </header>
                        
                        <div className={styles['section-list1']}>
                                {usersList}
                        </div>
                        
                        
                    </div>

                    <div className={styles['list-container']}>
                        <header className={styles['user-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Project developers</h3>
                            </div>
                        </header>
                        <div className={styles['section-list1']}>
                                {developersList}
                        </div>
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
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);