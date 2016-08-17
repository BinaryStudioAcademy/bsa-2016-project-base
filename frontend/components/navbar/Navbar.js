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

            <li key={1}>
              <Link to="/home" activeClassName={styles.active}>
                <span className={styles.icon}>
                  <FaHome size={15} />
                </span>
                <span className={styles['item-name']}>Projects</span>
              </Link>
           </li>

           <li key={2}>
              <Link to="/review" activeClassName={styles.active}>
                <span className={styles.icon}>
                  < FaAsterisk size={15} />
                </span>
                <span className={styles['item-name']}>Inquiry Review</span>
              </Link>
           </li>

           <li key={3}>
              <Link to="/stats" activeClassName={styles.active}>
                <span className={styles.icon}>
                  <FaBarChart size={15} />
                </span>
                <span className={styles['item-name']}>Stats</span>
              </Link>
           </li>

           <li key={4}>
              <Link to="/admin" activeClassName={styles.active}>
                <span className={styles.icon}>
                  <FaCog size={15} />
                </span>
                <span className={styles['item-name']}>Admin Area</span>
              </Link>
           </li>
            
            </ul>
          </div>
        )
    }
};

export default Navbar;