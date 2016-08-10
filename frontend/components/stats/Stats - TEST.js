import React, { Component } from 'react';
import styles from './stats.sass';

import {PieChart} from 'react-d3-basic';

class Stats extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
     let generalChartData = [
      {
        "age": "<5",
        "population": 2704659
      },
	  {
        "age": "5-13",
        "population": 4499890
      },
      {
        "age": "14-17",
        "population": 2159981
      },
	  {
        "age": "18-24",
        "population": 3853788
      },
	  {
        "age": "25-44",
        "population": 14106543
      },
      {
        "age": "45-64",
        "population": 8819342
      },
      {
        "age": "≥65",
        "population": 612463
      }
    ];


  let width = 700,
    height = 400,
    value = function(d) {
      return +d.population;
    },
    name = function(d) {
      return d.age;
    },
    chartSeries = [
      {
        "field": "<5",
        "name": "less than 5"
      },
      {
        "field": "5-13",
        "name": "5 to 13"
      },
      {
        "field": "14-17",
        "name": "14 to 17"
      },
      {
        "field": "18-24",
        "name": "18 to 24"
      },
      {
        "field": "25-44",
        "name": "25 to 44"
      },
      {
        "field": "45-64",
        "name": "45 to 64"
      }
    ],
    innerRadius = 10;

		
	    return (
		// Display some project stats	
	    	<div className={styles.alert}>		
					<PieChart
					  data= {generalChartData}
					  width= {width}
					  height= {height}
					  chartSeries= {chartSeries}
					  value = {value}
					  name = {name}
					  innerRadius = {innerRadius}
					/>
			</div>

	    )
	}
};

export default Stats;

