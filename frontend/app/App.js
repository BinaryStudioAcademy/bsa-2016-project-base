import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {setAuthUser} from '../actions/UserAuthActions';

import cookies from 'react-cookie';


class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
       this.props.setAuthUser(cookies.load('serverUID'), cookies.load('userRole'));
       console.log(this.props.authUser);
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setAuthUser:setAuthUser
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        authUser: state
    };
}
const AppModifated = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppModifated;
