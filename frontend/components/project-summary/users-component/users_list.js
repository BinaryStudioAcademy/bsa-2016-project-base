import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from './actions/index';
console.log(fetchUsers);
import CheckBox from './checkbox';
import styles from './users.sass';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    render() {
        // console.log(this.props.users[0]);
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

            if (searchPosition != search.length) {
                return '';
            }

            return tokens.join('');
        }
        
        let filteredUsers = this.props.users.filter(user => {
            return search(user.userName, this.state.search);
        });

        let users = filteredUsers.map((user) => {
            return (
                <li key={user._id} className={styles.listItem}>
                    <img src="https://placehold.it/50x70" />
                    <div className={styles.userName}>{user.userName}</div>
                    <div className={styles.userPosition}>Front-End Developer</div>
                    <CheckBox isOwner = {user.isOwner}/>
                </li>
            );
        });
        
        return (
            <div className={styles.wrapper}>
                <h1>Users</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value= { this.state.search }
                        placeholder = 'Search' 
                        onChange={ this.updateSearch.bind(this)}
                    />
                </div>
                <ul className={styles.userList}>
                    {users}
                </ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUsers }, dispatch);
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);