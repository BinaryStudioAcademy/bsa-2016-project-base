import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar'
import {Grid} from 'react-bootstrap';

import styles from './app.sass';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar/>
                <Grid>{this.props.children}</Grid>
            </div>
        )
    }
}

export default App;
