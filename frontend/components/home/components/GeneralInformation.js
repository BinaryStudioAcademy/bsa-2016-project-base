import React, { Component } from 'react';
import styles from './GeneralInformation.sass';

export default class GeneralInformation extends Component {

    static propTypes = {
        cnt: React.PropTypes.number.isRequired
    };

    render() {
        const { cnt } = this.props;

        return (
            <div className={styles.count}>
                {(cnt)?
                    <span>Found {(cnt > 1)?`${cnt} projects`: `${cnt} project`}</span>:
                    <span>Projects not found</span>
                }
            </div>
        )
    }
}