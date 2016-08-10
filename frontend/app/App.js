import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar'
import {Grid, Row, Col} from 'react-bootstrap';

import styles from './app.sass';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Grid >
                    <Row>
                        <Col xs={12} sm={2} md={2}>
                            <Navbar/>
                        </Col>
                        <Col xs={12} sm={10} md={10}>
                            {this.props.children}
                        </Col>
                    </Row>
               </Grid>
            </div>
        )
    }
}

export default App;
