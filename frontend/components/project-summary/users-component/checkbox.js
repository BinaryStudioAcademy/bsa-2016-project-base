import React, { Component } from 'react';
import styles from './users.sass';
export default class CheckBox extends Component {
    render() {
        if (this.props.isOwner) {
            return(
            <div className={styles.ownerCheckBox}>
                <input type="checkbox" defaultChecked />owner
            </div>
            );
        }
        else {
            return(
                <div className={styles.ownerCheckBox}>
                    <input type="checkbox" />owner
                </div>
            );
        }
    }
}