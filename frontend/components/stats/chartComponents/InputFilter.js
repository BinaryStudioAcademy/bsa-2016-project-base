import React, { Component } from 'react';
import styles from '../stats.sass';

class InputFilter extends Component {
    constructor(props) {
        super(props);
    }

    getButtons() {
        const {onChange, chartType} = this.props,
            prompts = ["№ active projects", "№ of used Twchnologies", "№ Most popular Tags"],
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
            <div className={styles.container} id={styles.inputFieldChartStatistic}>
                {buttons}
            </div>)
    }

    render() {
        const {selectAll, selectAllChanged} = this.props;
        return (
            <div>
                {this.getButtons()}
                <div>
                    <label><input type="checkbox" checked={selectAll}
                                  onChange={selectAllChanged}
                                  className={styles.checkbox}
                    />Select All</label>

                </div>
            </div>
        )
    }
}
;

export default InputFilter;

