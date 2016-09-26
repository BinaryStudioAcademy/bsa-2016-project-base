import React, { Component } from 'react';
import InputFilter from './InputFilter.js'

import styles from '../stats.sass';

class ChartStatistic extends Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const {onChange, chartType, selectAll, selectAllChanged} = this.props;
		return (
			<InputFilter onChange={onChange}
							 chartType={chartType}
							 selectAll={selectAll}
							 selectAllChanged={selectAllChanged}
			/>
		)
	}
}

export default ChartStatistic;

