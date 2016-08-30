import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from './checkbox';
import styles from './users.sass';
import * as actions from '../../../actions/project-view-actions.js';
import { Router, Route, Link, browserHistory } from 'react-router'
import TextFieldUI from '../../common/TextField-ui.js';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    whoIsOwner(users, owners) {
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < owners.length; j++) {
                if (users[i]._id === owners[j]._id) {
                    users[i].isOwner = true;
                    break;
                }
                else {
                    users[i].isOwner = false;
                }
            }
        }
        return users;
    }

    render() {
        let {users, owners} = (this.props.rootState.ProjectViewReducer.currentProject) ? 
            this.props.rootState.ProjectViewReducer.currentProject : {users:[], owners:[]};
        users = users.slice(0);
        owners = owners.slice(0);
        users = this.whoIsOwner(users, owners);
        let search = (text, search) => {
            search = search.replace(/\ /g, '').toLowerCase();
            let tokens = text.split('');
            let searchPosition = 0;

            tokens.forEach((char, i) => {
                if (char.toLowerCase() === search[searchPosition]) {
                    searchPosition++;
                }
                if (searchPosition >= search.length) {
                    return false;
                }
            });

            if (searchPosition !== search.length) {
                return '';
            }

            return tokens.join('');
        }

        let filteredUsers = users.filter(user => {
            return search(user.userName + user.userSurname + user.position, this.state.search);
        });

        users = filteredUsers.map((user, index) => {
            return (
                <li key={user._id} className={styles.listItem}>
                    <Link to={`/api/users/${user._id}`} className={styles.link}>
                        <div className={styles.userImage}><img src="https://s10.postimg.org/65lyiskd5/convict.png" /></div>
                        <div className="nameAndPosition">
                            <div className={styles.userNamee}>{user.userName + " " + user.userSurname}</div>
                            <div className={styles.userPosition}>{user.position}</div>
                        </div>
                        <div className="isOwner">
                         <CheckBox isOwner={user.isOwner} />
                            </div>
                    </Link>
                </li>
            );
        });
        return (
            <div id={styles.wrapper}>

                {/*<div className={styles.header}>
            </div>*/}
              <div className={styles.inputContainer}>
                      <TextFieldUI
                          onChange={ this.updateSearch.bind(this)}
                          hintText="Search"
                          style={{width: "200px", display: "block", margin: "0 auto"}}
                      />
                  <div className="description">
                      <div className="descriptionOwner">
                          <span className="owner"/>
                          <span>Owner</span>
                      </div>
                      <div className="descriptionProgrammer">
                          <span className="programmer"/>
                          <span>Programmer</span>
                      </div>
                  </div>
                   </div>
                <ul className={styles.userList}>
                    {users}
                </ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        rootState: state
    };
}
const UserListConnected = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default UserListConnected; 

