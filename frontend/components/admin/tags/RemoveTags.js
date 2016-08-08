import React, { PropTypes } from 'react';
import { Col, Checkbox, Button, ButtonGroup } from 'react-bootstrap';
import styles from './tags.sass';

const RemoveTags = ({selectAll, deleteMany, isAllChecked}) => {
  	return (
		<Col xs={12} sm={4} md={4}>
			<div className={styles["tags-deletion"]}>
    			<ButtonGroup>
    				<Button className={styles["tags-btn"]}>
					    <Checkbox
							inline 
							checked={isAllChecked} 
							onChange={selectAll}>
							Select all
						</Checkbox>
					</Button>
					<Button 
						className={styles["tags-btn-remove"]}
						onClick={deleteMany}>
						Remove
					</Button>
				</ButtonGroup>
				
			</div>
		</Col>
  	);
};

RemoveTags.propTypes = {
  	selectAll: PropTypes.func.isRequired,
  	deleteMany: PropTypes.func.isRequired,
  	isAllChecked: PropTypes.bool.isRequired
};

export default RemoveTags;

