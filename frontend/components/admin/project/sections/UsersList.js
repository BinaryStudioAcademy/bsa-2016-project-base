import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, DropDown,DatePickerControlled} from '../../../common/';
import DeveloperItem from './DeveloperItem';
import UserItem from './UserItem';
import styles from './styles/UsersList.sass';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.addUserToProject = this.addUserToProject.bind(this);
        this.removeUserFromProject = this.removeUserFromProject.bind(this);
        this.onOwnershipChange = this.onOwnershipChange.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.renderuserHistoryDates = this.renderuserHistoryDates.bind(this);
        this.setUserStartDate = this.setUserStartDate.bind(this);
        this.setUserEndDate = this.setUserEndDate.bind(this);
        
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
    setUserStartDate(e, date){
        const { activeUser } = this.props;
        this.props.setUserStartDate(activeUser, date);
    }
    setUserEndDate(e, date){
        const { activeUser } = this.props;
        this.props.setUserEndDate(activeUser, date);
    }
    selectUser(e, userId) {
        //console.log('selectUser ', userId);
        console.log('selectUser', userId);
        if (e.target.nodeName === "DIV" || e.target.nodeName === "IMG") {
            const {activeUser} = this.props;
            if (activeUser === userId) {
                this.props.selectUser(null);
            } else {
                this.props.selectUser(userId);
            }
        }
        //console.log('this.props.activeUser ', this.props.activeUser);
    }
    renderuserHistoryDates() {
        const { users,activeUser,userStory } = this.props;

        console.log('userStory ',userStory);

        const selectedUser = users.filter(user => {
            return user.inProject && user._id === activeUser;
        })[0];

        let startDate;
        let endDate;

        if (selectedUser){
             if (userStory.hasOwnProperty(activeUser)){
                startDate = userStory[activeUser].dateFrom;
                endDate = userStory[activeUser].dateTo;
             }
            
        } 



        if (activeUser) {
            return <div className={styles['dates']}>
                            <div className={styles['col-1-3']}>
                            <DatePickerControlled
                                value={startDate}
                                hint='Start Date'
                                style={{width: '100%'}}
                                onChange={this.setUserStartDate}
                            />
                        </div>
                        <div className={styles['col-1-3']}>
                            <DatePickerControlled
                                value={endDate}
                                hint='End Date'
                                style={{width: '100%'}}
                                onChange={this.setUserEndDate}
                            />
                        </div>
                    </div>
        } else {
            return <div className={styles['dates']}>Select developer in the list above and set period during which he's been working on this project.</div>
        }
    }
    render() {
        console.log('UsersList LLLLLLL');

        const { users, activeUser } = this.props;
      

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
                        selected={user._id === activeUser}
                        onUserSelect={this.selectUser}
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

                    <div className={styles['list-container']} style={{width:"49%"}}>
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
                <div className={styles.row}>
                  <div className={styles['date-container']}>
                   <header className={styles['user-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Period</h3>
                            </div>
                        </header>
                        
                        {this.renderuserHistoryDates()}
                       
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
    console.log('developersList mapStateToProps')
    return {
        users: state.UpsertProjectReducer.users,
        activeUser: state.UpsertProjectReducer.activeUser,
        userStory: state.UpsertProjectReducer.userStory
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);