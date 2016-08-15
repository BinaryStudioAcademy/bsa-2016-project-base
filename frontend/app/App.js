import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import styles from './app.sass';
import Navbar from '../components/navbar/Navbar'

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.container}>
                        <Navbar />
                            {this.props.children}
            </div>
        )
    }
}

export default App;
