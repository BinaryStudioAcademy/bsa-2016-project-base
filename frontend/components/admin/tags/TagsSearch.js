import React, { PropTypes } from 'react';
import { Col, FormControl } from 'react-bootstrap';
import styles from './tags.sass';

const TagsSearch = ({searchTag}) => {
  	return (
		<Col xs={12} sm={4} md={4} className={styles.searchTag}>
			<FormControl 
				type="search" 
				placeholder="Search"
				onChange={searchTag} 
			/>
		</Col>
  	);
};

TagsSearch.propTypes = {
  	searchTag: PropTypes.func.isRequired
};

export default TagsSearch;

