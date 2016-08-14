import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';

class RightsToolbar extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
<div >
        <div className="row">
            <div className="col-md-5">
            <div className={styles['search-input-container']}>
              <FormControl className={styles['search-input']}
                           type="text" placeholder="Search" //onChange={}
                           id="RightsSearchInput"/>
              <span className={styles['search-input-border']}></span>

          </div>


            </div>
            <div className="col-md-4">
            <FormControl type="checkbox" className={styles['select-all-checkbox']} id="SelectAll"/>
            <label htmlFor="SelectAll" className={styles['select-all-label']}>Select all</label>
            <select name="s">
                      <option defaultValue>Chose project</option>
                      <option>Project1</option>
                      <option>Project2</option>
                      <option>Project3</option>
                      <option>Project4</option>
            </select>
            </div>
            <div className="col-md-3">
            <label><Checkbox > </Checkbox>Read</label>
            <label><Checkbox > </Checkbox>Write</label>

            <Button>Save changes</Button>
            </div>
        </div>


</div>



	    )
	}
};
export default RightsToolbar;
