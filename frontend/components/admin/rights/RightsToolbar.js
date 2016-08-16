import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchProjects } from '../../../actions/usersRightsActions';

class RightsToolbar extends Component {
	constructor(props) {
	    super(props);
	}


	componentWillMount() {
	 	 this.props.fetchProjects();
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
            <select name="s" >
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
				fetchProjects:fetchProjects
    }, dispatch);
}

function mapStateToProps(state) {
    return {
				projectRights: state['ProjectsRightsReducer']
    };
}
const RightsToolbarConnected = connect(mapStateToProps, mapDispatchToProps)(RightsToolbar);

export default RightsToolbarConnected;
