import React, { Component } from 'react';
import styles from '../stats.sass';
import InputFilter from './InputFilter.js'

import { Button, Input, Grid, Row, Col, Thumbnail, Glyphicon } from 'react-bootstrap';

class ChartStatistic extends Component 
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const {onChange, chartType, selectAll, selectAllChanged} = this.props;
		return (
			<div>
				<h2 className={styles.title}>Chart Statistic</h2>
					<hr id={styles.nine} />
						<InputFilter onChange={onChange}
									 chartType={chartType}
									 selectAll={selectAll}
									 selectAllChanged={selectAllChanged}/>
					<hr id={styles.eight} />
			</div>
		)
	}
};

export default ChartStatistic;

