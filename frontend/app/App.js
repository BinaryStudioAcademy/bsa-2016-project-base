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

import FaList from 'react-icons/lib/fa/list';




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
            React.Children.forEach(this.props.children, function(child, i) {

               if(child.type['name'].toLowerCase().indexOf('admin') == -1) {
                console.log(child);
                children.push( <div key={i}>{child}</div>);
            }
               else children.push(<NotFound key={i} />);
            });
        } else children = this.props.children;
        return (
            <div id={styles["app-container"]}>
                <div className={styles.row}>
                    <Navbar />
                    <div id={styles["main-content"]}>
                        <div className={styles.row}>
                            <div className={styles['main-header']}>
                                <FaList size={20} />
                                {(this.props.children.props.route.path) ? <span key={Math.floor(Math.random() * 10)}>{this.props.children.props.route.title}</span> : <span>Home</span>
                                }
                                {/*console.log(this.props.route.path)*/}
                                {/*<span>{this.props['authUser'].userEmail}</span>*/}
                                <FaExit  size={20} onClick={()=>{
                                    cookies.remove('x-access-token');
                                    cookies.remove('userEmail');
                                    cookies.remove('userRole');
                                    //window.location.reload(true);
                                    window.location.assign("http://localhost:2020/");
                                }}/>
                            </div>
                            {children}
                        </div>
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

