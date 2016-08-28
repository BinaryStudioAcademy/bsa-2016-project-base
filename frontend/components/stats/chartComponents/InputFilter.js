import React, { Component } from 'react';
import styles from '../stats.sass';

class InputFilter extends Component {
    constructor(props) {
        super(props);
    }

    getButtons() {
        const {onChange, chartType} = this.props,
            prompts = ["Active Projects", "Used Technologies", "Most Popular Tags"],
            chartTypes = ["Linear", "Circle", "Bar"];
        let buttons = [];
        for (let i = 0; i < prompts.length; i += 1) {
            const className=chartType==chartTypes[i]?"btn btn-primary active":"btn";
            buttons.push((
                <button onClick={onChange.bind(null, chartTypes[i])}
                        type="button"
                        className={className}>
                    {prompts[i]}
                </button>
            ))
        }
        return (
            <div className={styles['controls-group']}>
                {buttons}
            </div>)
    }

    render() {
        const {selectAll, selectAllChanged} = this.props;
        return (
            <div className={styles['controls-wrap']} >
                {this.getButtons()}
                <div className={styles['controls-group']} >
                    <input type="checkbox" id="charts-select-all"
                           checked={selectAll}
                           onChange={selectAllChanged}
                           className={styles.checkbox}
                    />
                    <label htmlFor="charts-select-all">Select All</label>
                    {/*<label><input type="checkbox" checked={selectAll}
                                  onChange={selectAllChanged}
                                  className={styles.checkbox}
                    />Select All</label>*/}
                </div>
            </div>
        )
    }
}
;

export default InputFilter;

