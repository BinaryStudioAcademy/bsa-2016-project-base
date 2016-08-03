import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar'

import styles from './App.sass';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className={styles.container} >{this.props.children}</div>
            </div>
        )
    }
}

export default App;
