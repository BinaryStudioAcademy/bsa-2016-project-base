import React, { Component, PropTypes } from 'react';
import { Button, FormControl} from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './features.sass'

class FeaturesListItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			null
		)
	}
}

class FeaturesList extends  Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (null

		);
	}
}

class FeaturesToolBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let items = { item1: "item1",item2: "item2"};

		let sectionItems = new Array();
		for(var i in items) sectionItems.push(<option key={i} value={i}>{items[i]}</option>);
		return (
			<div className={styles['features-tool-bar']}>
				<div className={styles['search-input-container']}>
					<FormControl className={styles['search-input']} ref="search-feature" type="text" placeholder="Search" />
					<span className={styles['search-input-border']}></span>
				</div>
				<FormControl className={styles['select-features']} componentClass="select" placeholder="select">
					{sectionItems}
				</FormControl>
				<FormControl type="checkbox" className={styles['select-all-checkbox']} name="checkbox" id="select-all"/>
				<label htmlFor="select-all" className={styles['select-all-label']}>Select all</label>
				<Button>Removed checked</Button>
				<Button>Add</Button>
			</div>
		)
	}
}
class FeaturesTab extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
		const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

		//				<FeaturesToolBar />
	    return (
	    	<Grid>
					<Row className="show-grid">
						<Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
						<Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}</Col>
						<Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
						<Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 2).join(' ')}</Col>
					</Row>
				</Grid>
	    )
	}
};


export default FeaturesTab;
