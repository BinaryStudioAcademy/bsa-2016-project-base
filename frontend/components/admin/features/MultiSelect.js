import React, { Component, PropTypes } from 'react';
import {Dropdown} from 'react-bootstrap';
import styles from './styles/Features.sass';

export default class MultiSelect extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { children } = this.props;
        return (
            <Dropdown id="dropdown-multiselect" className={styles['multi-select']}>
                <div bsRole="toggle" ><label>{this.props['title']}</label></div>
                <div className="dropdown-menu"  bsRole="menu">{children}</div>
            </Dropdown>
        );
    }
}
