import React, { Component, PropTypes } from 'react';
import { Button, FormControl} from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './features.sass'

class FeaturesSectionSearchComponent extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<FormControl className={styles['section-input']} type="text" />
				<div className={styles['sections-list']}></div>
			</div>
		)
	}
}
class FeaturesListItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Row>
				<Col  xs={5} sm={3} md={3} lg={3}>
					<div className={styles['list-item-navigation']}>
						<div>
							<FormControl type="checkbox" className={styles['select-feature-checkbox']}
								 name="checkbox" id={this.props['data-id']}
								 onChange={(e)=>{
								 }}
							/>
							<label htmlFor={this.props['data-id']} className={styles['select-feature-label']}>
								{this.props['name']}
							</label>
						</div>
						<div>
							<span>Section: </span>
							<label>{this.props['section']}</label>
						</div>
					</div>
				</Col>
				<Col  xs={7} sm={9} md={9} lg={9}>
					{this.props['description']}
				</Col>
			</Row>
		)
	}
}

class FeaturesList extends  Component {
	constructor(props) {
		super(props);
	}
	render() {
		let items =[{
			name :"Feature 1",
			description: "",
			section:"WEB"
		},{
			name :"Feature 2",
			section:"Xamarine"
		},{
			name :"Feature 3",
			section:"Xamarine",
			description:"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю" +
			"Съешь ещё этих мягких французских булок, да выпей же чаю"
		}];
		let featuresItems = new Array();
		for(var i in items) featuresItems.push(
			<FeaturesListItem key={i} data-id={i}
							  name={items[i].name}
							  section={items[i].section}
							  description={items[i].description}
			/>);
		return (<Grid className={styles['list-container']}>{featuresItems}</Grid>);
	}
}

class FeaturesToolBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let items = { item1: "item1",item2: "item2"};
		/*
		 <FormControl className={styles['select-features']} componentClass="select" placeholder="select">
		 {sectionItems}
		 </FormControl>
		*/
		let sectionItems = new Array();
		for(var i in items) sectionItems.push(<option key={i} value={i}>{items[i]}</option>);
		return (
			<Grid>
				<Row className={styles['features-tool-bar']}>
					<Col xs={3} sm={2} md={4} lg={4}>
						<div className={styles['search-input-container']}>
							<FormControl className={styles['search-input']} ref="search-feature" type="text" placeholder="Search" />
							<span className={styles['search-input-border']}></span>
						</div>
					</Col>
					<Col xs={3} sm={4} md={4} lg={4}>
						<FeaturesSectionSearchComponent />
					</Col>
					<Col xs={6} sm={6} md={4} lg={4}>
						<FormControl type="checkbox" className={styles['select-all-checkbox']} name="checkbox" id="select-all"/>
						<label htmlFor="select-all" className={styles['select-all-label']}>Mark all</label>
						<Button className={styles['button-feature-remove']}>Remove checked</Button>
						<Button className={styles['button-feature-add']}>Add feature</Button>
					</Col>
				</Row>
			</Grid>
		)
	}
}
class FeaturesTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
			<div>
				<FeaturesToolBar />
				<FeaturesList />
			</div>
	    )
	}
};


export default FeaturesTab;
