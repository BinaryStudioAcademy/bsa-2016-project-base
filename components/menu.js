import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './sass/menu.sass'

class Menu extends Component {
    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <Link to={`/completed`} >List of completed projects</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={`/single`} >Single opened project</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={`/update`} >Create (update project)</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={`/admin`} >Administration</Link>
                </div>
                <div className={styles.menuItem}>
                    <Link to={`/chart`} >Charts view</Link>
                </div>
            </div>
        )
    }
}

export default Menu;