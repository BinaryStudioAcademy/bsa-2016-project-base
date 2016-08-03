import React, { Component } from 'react'

import styles from './sass/completed.sass'

class Completed extends Component {
    render() {
        return (
            <div className={styles.alert} >
                <h1>Ooops! This page is under construction...</h1>
            </div>
        )
    }
}

export default Completed;