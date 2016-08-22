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
            <div id={styles["app-container"]}>
                <div className={styles.row}>
                    <Navbar />
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
