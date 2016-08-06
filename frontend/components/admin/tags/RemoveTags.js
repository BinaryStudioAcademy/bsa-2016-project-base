import React, { PropTypes } from 'react';
import { Col, Checkbox, Button } from 'react-bootstrap';
import styles from './tags.sass';

const RemoveTags = ({selectAll, deleteMany, isAllChecked}) => {
  	return (
  		<div>
		<Col xs={12} sm={4} md={4}>
			<Checkbox inline checked={isAllChecked} onChange={selectAll}>
			 	Select all
			</Checkbox>
			<Button bsSize="sm" bsStyle="warning" onClick={deleteMany}>Remove</Button>
		</Col>
	</div>
  	);
};

RemoveTags.propTypes = {
  	selectAll: PropTypes.func.isRequired,
  	deleteMany: PropTypes.func.isRequired,
  	isAllChecked: PropTypes.bool.isRequired
};

export default RemoveTags;

