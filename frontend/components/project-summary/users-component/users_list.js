import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styles from './users.sass';

class UserList extends Component {
    
    constructor(props) {
            super(props);

            this.state = {
                search: ''
            };
    }

    renderList() {
        return this.props.users.map((user) => {
            return (
                <ListGroupItem key={user.name}>
                    <img src='https://placehold.it/50x70' />
                    <div className='userName'>{user.name}</div>
                    <div className='userPosition'>{user.position}</div>
                    
                        if (user.owner) {
                            <div className='ownerCheckBox'>
                                <input type='checkbox' checked />owner
                            </div>
                        }
                        else {
                            <div className='ownerCheckBox'>
                                <input type='checkbox' />owner
                            </div>
                        }
                </ListGroupItem>
            );
        })
    }

    render() {

        return (
            <div className={styles.wrapper}>
                <h1>Users</h1>
                <div className={styles.inputContainer}>
                    <input
                        type='text'
                        value= { this.state.search }
                        placeholder = 'Search' 
                        onChange={ (event) => this.setState({ search: event.target.value})}
                    />
                </div>
                <ListGroup>
                    {this.renderList()};
                </ListGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(UserList);