import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import styles from './users.sass';
export default class Users extends Component {
    constructor(props) {
            super(props);

            this.state = {
                search: ''
            };
    }

    render() {

        return (
            <div className={styles.wrapper}>
                <h1>Users</h1>
                <div className={styles.inputContainer}>
                    <input
                        type='text'
                        value= { this.state.search }
                        placeholder = 'Seach' 
                        onChange={ (event) => this.setState({ search: event.target.value})}
                    />
                </div>
            </div>
        )
    }
}