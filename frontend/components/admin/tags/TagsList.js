import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import TagItem from './TagItem';


const TagsList = ({tags, selectOne}) => {

	const list = [];
	if (tags.length) {
		tags.forEach((tag, index) => {
			if (tag.match) list.push(
		    	<TagItem
		    		key={tag._id}
			        tag={tag}
			        selectOne={selectOne}
		      	/>
			);
		});
	}
	
	if (!list.length) {
		return (<p>No tags to display! Add new or change search term!</p>);
	}

	return (
		<Row className="show-grid">
		  <Col xs={12} sm={12} md={12}>
		  	 {list}
		  </Col>
		</Row>
	);
};

TagsList.propTypes = {
  	tags: PropTypes.array.isRequired,
  	selectOne: PropTypes.func.isRequired
};

export default TagsList;