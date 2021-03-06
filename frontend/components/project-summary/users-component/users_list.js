import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../../actions/UsersActions';
import CheckBox from './checkbox';
import styles from './users.sass';
import { Row, Col, ListGroup, ListGroupItem, FormControl, FormGroup, InputGroup, Modal, Label, Glyphicon, Button } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router'

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
	console.log(this.props.users);
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

            if (searchPosition !== search.length) {
                return '';
            }

            return tokens.join('');
        }

        let filteredUsers = this.props.users.filter(user => {
            return search(user.userName + user.userSurname + user.position, this.state.search);
        });

        let users = filteredUsers.map((user, index) => {
            return (
                <li key={user._id} className={styles.listItem}>
                    <Link to={`/api/users/${user._id}`} className={styles.link}>
                        <div className={styles.userImage}><img src=" http://placehold.it/45x45" /></div>
                        <div className={styles.userName}>{user.userName + " " + user.userSurname}</div>
                        <div className={styles.userPosition}>{user.position}</div>
                        <CheckBox isOwner = {user.isOwner}/>
                    </Link>
                </li>
            );
        });

        return (
            <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>users</h1>
            </div>
              <div className={styles.inputContainer}>
                  <div className={styles.wrapperSearch}>
                  <InputGroup>
                    <InputGroup.Addon className={styles.searchSign}>
                        <Glyphicon glyph="search" className={styles.searchIcon} />
                    </InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            onChange={ this.updateSearch.bind(this)}
                        />
                    </InputGroup></div>
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
    console.log(state);
    return {
        users: state.UsersReducer.users
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
