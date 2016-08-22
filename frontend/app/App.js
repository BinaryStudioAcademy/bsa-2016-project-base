import cookies from 'react-cookie';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import FaUser from 'react-icons/lib/fa/user-secret';
import FaExit from 'react-icons/lib/fa/sign-out';
import Navbar from '../components/navbar/Navbar';
import NotFound from '../components/not-found/NotFound';

import styles from './app.sass';
import {setAuthUser} from '../actions/UserAuthActions';

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.setAuthUser(
            cookies.load('userEmail'), 
            cookies.load('userRole')
       );
    }
    render() {
        let children;
        if(this.props.authUser['userRole']!= 'ADMIN'){
            children = [];
            React.Children.map(this.props.children, function(child) {
               if(child.type['name'].toLowerCase().indexOf('admin') == -1) children.push(child);
               else children.push(<NotFound />);
            });
        } else children = this.props.children;
        return (
            <div className={styles["main-container"]}>
                <div className={styles.mainRow}>
                    <Navbar />
                    <div className={styles["main-content"]}>
                        <div className={styles['main-header']}>
                            <FaUser size={30} />
                            <span>{this.props['authUser'].userEmail}</span>
                            <FaExit  size={22} onClick={()=>{
                                cookies.remove('userEmail');
                                cookies.remove('userRole');
                                cookies.remove('x-access-token');
                                //window.location.reload(true);
                                window.location.assign("http://localhost:2020/");
                            }}/>
                        </div>
                        {children}
                    </div>
                </div>
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

