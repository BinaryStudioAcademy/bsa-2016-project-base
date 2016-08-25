import React, { Component } from 'react';
import styles from './users.sass';
export default class CheckBox extends Component {
    render() {
        if (this.props.isOwner) {
            return(
              <span className={styles.owner}/>
            );
        }
        else {
            return(
                <span className={styles.programmer}/>
            );
        }
    }
}
