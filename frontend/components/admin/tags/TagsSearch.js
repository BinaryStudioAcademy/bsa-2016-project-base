import React, { PropTypes } from 'react';
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './tags.sass';

const TagsSearch = ({searchTag}) => {
  	return (
		<Col xs={12} sm={12} md={4}>
			<div className={styles["tags-search"]}>
				<InputGroup>
		        	<InputGroup.Addon>
		        		<i className="fa fa-search" aria-hidden="true"></i>
		        	</InputGroup.Addon>
		        	<FormControl 
						type="search" 
						placeholder="Search"
						onChange={searchTag} 
					/>
		     	</InputGroup>
			</div>
		</Col>
  	);
};

TagsSearch.propTypes = {
  	searchTag: PropTypes.func.isRequired
};

export default TagsSearch;

