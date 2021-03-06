/*
    Андрей
*/

import React, { Component } from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
// import styles from './styles/dropdown.sass';

export default class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: 'hidden'
        };
    }

    toggleList() {
        let css = (this.state.showList === "hidden") ? "show" : "hidden";
        this.setState({ 'showList': css });
    }

    render()  {
         let options = this.props.data.map( (item, index) => {
                return (
                    <li key={index}>
                        <input
                            type='checkbox'
                            value={item.value}
                            onChange={this.props.onItemSelect}
                            id={item.id}
                            className={styles.hiden}
                        />
                        <label htmlFor={item.id}>{item.name}</label>
                    </li>
                );
            });
        return(

            <div className={styles["dropdown-container"]}>
                <div className={styles["dropdown-display-" + this.state.showList]} onClick={this.toggleList.bind(this)}>
                    <span>{this.props.type}</span>
                    <FaAngleDown size={25}/>
                </div>
                <ul className={styles["dropdown-list"]}>
                    {options}
                </ul>
            </div>
        );
    }
}
