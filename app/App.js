import React, { Component } from 'react';
import Menu from '../components/menu.js'

import styles from './App.sass';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Menu />
                <div className={styles.container} >{this.props.children}</div>
            </div>
        )
    }
}

export default App;
