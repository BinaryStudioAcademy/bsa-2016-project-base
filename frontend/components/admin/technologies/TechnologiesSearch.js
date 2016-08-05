import React, { Component, PropTypes } from 'react';

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
	    	<input type="text" onChange={this.onChange}  value={this.state.item}/>
	    )
	}
};

/*TagsTab.propTypes = {
	tags: PropTypes.array.isRequired,
  	addTag: PropTypes.func.isRequired,
  	removeTag: PropTypes.func.isRequired
};*/


export default TechnologiesSearch;
