import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../sass/navbar.sass';

class Navbar extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <Link to={"/projects"} >Projects</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={"/stats"} >Stats</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={"/review"} >Inquiry review</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={"/admin"} >Administration</Link>
                </div>
            </div>
        )
    }
};

export default Navbar;