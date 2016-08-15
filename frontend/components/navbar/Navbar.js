import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Panel, Nav,NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './navbar.sass';
import {FaHome, FaAsterisk, FaBarChart, FaCog} from 'react-icons/lib/fa';
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
        return (
          <div className="sidebar">
            <div className={styles.sidebarHeader}>
              <p>INTRANET</p>
            </div>
            <ul className={styles.mainNav}>

              <Link to="/home">
                <span className={styles.icon}>
                  <FaHome size={15} />
                </span>
                <li key={1}>Projects</li>
              </Link>

              <Link to="/review">
                <span className={styles.icon}>
                  <FaAsterisk size={15} />
                </span>
                <li key={2}>Inquiry Review</li>
              </Link>

              <Link to="/stats">
                <span className={styles.icon}>
                  <FaBarChart size={15}/>
                </span>
                <li key={3}>Stats</li>
              </Link>

              <Link to="/admin">
                <span className={styles.icon}>
                  <FaCog size={15} />
                </span>
                <li key={4}>Admin Area</li>
              </Link>

            </ul>
          </div>
        )
    }
};

export default Navbar;