import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar'
import NotFound from '../components/not-found/NotFound'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {setAuthUser} from '../actions/UserAuthActions';

import cookies from 'react-cookie';
import styles from './app.sass';

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.setAuthUser(
            cookies.load('serverUID'), 
            cookies.load('userRole')
       );
    }
    logout(){
        cookies.remove('serverUID');
        cookies.remove('userRole');
        cookies.remove('x-access-token');
        //window.location.reload(true);
        window.location.assign('http://localhost:2020/');
    }
    render() {
        var children = null;
        if(this.props.authUser['userRole']!= 'ADMIN'){
            children = [];
            React.Children.map(this.props.children, function(child) {
               if(child.type['name'].toLowerCase().indexOf('admin') == -1) children.push(child);
               else children.push(<NotFound />);
            });
        } else children = this.props.children;
        return (
            <div>
                <Grid >
                    <Row>
                        <Col xs={12} sm={2} md={2}>
                            <Navbar/>
                        </Col>
                        <Col xs={12} sm={10} md={10}>
                            <Row  className={styles['user-panel']}>
                                <Col xs={10} sm={11} md={11}>
                                    Welcome:
                                    <label> {this.props.authUser['serverUID']} </label>    
                                </Col>
                                <Col xs={2} sm={1} md={1} className={styles['logout']}>
                                    <label onClick={this.logout}>Exit</label>
                                 </Col>
                            </Row>
                            {children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAuthUser:setAuthUser}, dispatch);
}

function mapStateToProps(state) {
    return { authUser: state['UserAuthReducer']};
}

const AppModifated = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppModifated;
