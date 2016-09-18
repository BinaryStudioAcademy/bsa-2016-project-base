import { Link } from 'react-router';
import React, { Component } from 'react';
import {FaHome, FaAsterisk, FaBarChart, FaCog, FaPlus} from 'react-icons/lib/fa';

import styles from './navbar.sass';

export default class Navbar extends Component {

  	constructor(props) {
  	    super(props);
        this.state = { isMenuActive: false };
        this.toggleMenu = this.toggleMenu.bind(this);
  	}

    toggleMenu(e) {
        this.setState({ isMenuActive: !this.state.isMenuActive});
    }

   	render() {
        return (
            <div id={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <p>INTRANET</p>
                </div>
                <ul className={styles.mainNav}>

                <li key={1} id="project-menuItem">
                    <Link to="/home" activeClassName={styles.active}>
                        <span className={styles.icon}>
                            <FaHome size={15} />
                        </span>
                        <span className={styles['item-name']}>Projects</span>
                    </Link>
               </li>

               <li key={2} id="review-menuItem">
                    <Link to="/review" activeClassName={styles.active}>
                        <span className={styles.icon}>
                            <FaAsterisk size={15} />
                        </span>
                        <span className={styles['item-name']}>Inquiry Review</span>
                    </Link>
               </li>

               <li key={3} id="stats-menuItem">
                    <Link to="/stats" activeClassName={styles.active}>
                        <span className={styles.icon}>
                            <FaBarChart size={15} />
                        </span>
                        <span className={styles['item-name']}>Stats</span>
                    </Link>
               </li>

               <li key={4} id="admin-menuItem">
                    <Link to="/admin" activeClassName={styles.active}>
                        <span className={styles.icon}>
                            <FaCog size={15} />
                        </span>
                        <span className={styles['item-name']}>Admin Menu</span>
                    </Link>
               </li>

    			     <li key={5} id="addProject-menuItem">
                    <Link to="/add-project" activeClassName={styles.active}>
                       <span className={styles.icon}>
                            <FaPlus size={15} />
                        </span>
                        <span className={styles['item-name']}>Add Project</span>
                    </Link>
               </li>
            </ul>
        </div>)
    }
};
