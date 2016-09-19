import React, { PropTypes } from 'react';
import { Col, Checkbox, Button, InputGroup, FormControl } from 'react-bootstrap';
import styles from './tags.sass';

const RemoveTags = ({selectAll, deleteMany, isAllChecked}) => {
  	return (
		<Col xs={12} sm={12} md={4}>
			<div className={styles["tags-deletion"]}>
    			<InputGroup className={styles["tags-input-group"]}>

    					 <FormControl type="checkbox" checked={isAllChecked}  className={styles['select-all-checkbox']}
                             id="markAll"  onChange={selectAll}
                        />
                        <label htmlFor="markAll" className={styles['select-all-label']}>Mark all</label>

					<Button
						className={styles["tags-btn-remove"]}
						onClick={deleteMany}>
						Remove
					</Button>
				</InputGroup>

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

