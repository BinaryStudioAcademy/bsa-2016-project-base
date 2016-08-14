import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Panel, Nav,NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './navbar.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Navbar extends Component {
	constructor(props) {
	    super(props);
         this.state = {
           isMenuActive: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
	}
    
    toggleMenu(e) {
        let state = this.state.isMenuActive;
        this.setState({
            isMenuActive: !state
        });
    }
 	render() {
        var adminLink = null;
        if(this.props.authUser['userRole'] == 'ADMIN'){
            adminLink = (<LinkContainer to="/admin" className={styles["menu-item"]}>
                <NavItem eventKey={4}>Admin Area</NavItem>
             </LinkContainer>);
        }
        return (
            <div className="nav-home">
                <div className={styles["toggle-menu"]} onClick={this.toggleMenu}> 
                    <i className={"fa fa-2x " + (this.state.isMenuActive ? "fa-times" : "fa-bars" )} aria-hidden="true"></i>
                </div>
                <Nav bsStyle="pills" stacked  navbar className={styles["menu-bar"] +" "+(this.state.isMenuActive ? "menu-bar-visible" : "" )}>
                    <LinkContainer to="/home" className={styles["menu-item"]}>
                        <NavItem eventKey={1}>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/review" className={styles["menu-item"]}>
                        <NavItem eventKey={2}>Inquiry Review</NavItem>  
                    </LinkContainer>  
                    <LinkContainer to="/stats" className={styles["menu-item"]}>
                        <NavItem eventKey={3}>Stats</NavItem>
                    </LinkContainer> 
                    {adminLink}
                </Nav>
            </div>
        )
    }
};
function mapStateToProps(state) {
    return {
        authUser: state['UserAuthReducer']
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
const NavbarModifated = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default NavbarModifated;