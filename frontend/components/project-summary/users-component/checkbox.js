import React, { Component } from 'react';
import styles from './users.sass';
export default class CheckBox extends Component {
    render() {
        if (this.props.isOwner) {
            return(
              <div className={styles.ownerCheckBox}>

              <label >
              <input type="checkbox" defaultChecked className={styles.graphic} />
              <span className={styles.labelText}></span>
              </label>

              </div>
            );
        }
        else {
            return(
              <div className={styles.ownerCheckBox}>
              <label >
              <input type="checkbox"  className={styles.graphic} />
              <span className={styles.labelText}></span>
              </label>
              </div>
            );
        }
    }
}
