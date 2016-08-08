import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar'
import Home from '../components/home/Home'
import {Grid} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar/>
                <Grid>{this.props.children || <Home />}</Grid>
            </div>
        )
    }
}

export default App;
