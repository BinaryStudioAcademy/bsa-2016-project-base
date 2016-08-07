import React, { Component, PropTypes } from 'react';
import styles from './styles.sass';
class TechnologiesSearch extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			item: '',
		};
		this.onChange = this.onChange.bind(this);
	}
	onChange(e){
		this.setState(
			{
				item: e.target.value
			}
		);
		this.props.technologiesSearch(e.target.value);
	}
 	render() {
	    return (
	    	<div className={styles.search__wrapper + ' col-md-5'}>
	    	<input placeholder="Search technologie" className={styles.search__input +' form-control'} type="text" onChange={this.onChange}  value={this.state.item}/>
				<i className="fa fa-search"></i>
			</div>
	    )
	}
};

/*TagsTab.propTypes = {
	tags: PropTypes.array.isRequired,
  	addTag: PropTypes.func.isRequired,
  	removeTag: PropTypes.func.isRequired
};*/


export default TechnologiesSearch;
