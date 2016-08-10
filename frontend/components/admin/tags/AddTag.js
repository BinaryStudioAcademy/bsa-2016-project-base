import React, { PropTypes } from 'react';
import { Col, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import styles from './tags.sass';

const AddTag = ({setTagName, addTag}) => {
  	return (
		<Col xs={12} sm={12} md={4}>
            <div className={styles["tags-creation"]}>
            <FormGroup>
                <InputGroup className={styles["tags-input-group"]}>
                    <FormControl 
                        type="text" 
                        placeholder="Tag name" 
                        onBlur={setTagName}
                    />
                    <InputGroup.Button className={styles["tags-input-group-btn"]}>
                        <Button 
                            className={styles["tags-add-btn"]}
                            onClick={addTag}>
                            Add
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
    		</FormGroup>
            </div>
		</Col>
  	);
};

AddTag.propTypes = {
  	setTagName: PropTypes.func.isRequired,
  	addTag: PropTypes.func.isRequired
};

export default AddTag;
