import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import styles from './users.sass';

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

    render() {
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
            return search(user.name, this.state.search);
        });

        let users = filteredUsers.map((user) => {
            return (
                <li key={user.name}>
                    <img src="https://placehold.it/50x70" />
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userPosition}>{user.position}</div>
                    <div className={styles.ownerCheckBox}>
                        <input type="checkbox" defaultChecked />owner
                    </div>
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

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(UserList);