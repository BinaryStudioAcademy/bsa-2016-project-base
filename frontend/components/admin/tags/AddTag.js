import React, { PropTypes } from 'react';
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import styles from './tags.sass';

const AddTag = ({setTagName, addTag}) => {
  	return (
		<Col xs={12} sm={4} md={4}>
		   <Form inline>
    			<FormGroup controlId="formInlineName">
     				<FormControl 
						type="text" 
						placeholder="Tag name" 
						onBlur={setTagName}
					/>
    			</FormGroup>
    			{' '}
   				<Button 
                    bsSize="sm" 
                    bsStyle="primary"
                    onClick={addTag}>
                    Add
                </Button>
  			</Form>
		</Col>
  	);
};

AddTag.propTypes = {
  	setTagName: PropTypes.func.isRequired,
  	addTag: PropTypes.func.isRequired
};

export default AddTag;
