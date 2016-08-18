import React, { Component, PropTypes } from 'react';
import {Grid, FormControl, Row, Col, Button,Checkbox} from 'react-bootstrap';
import styles from './styles/Rights.sass';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/admin/UsersRightsActions';

class RightsToolbar extends Component {
	constructor(props) {
	    super(props);
	}
  componentWillMount(){
    this.props.fetchProjectsList();
  }
 	render() {
    let items = [], projects = this.props['usersRights'].projectsList;
    for(var i in projects) items.push(
      <option value={projects[i].id} 
        key={projects[i].id} > 
        {projects[i].projectName}
      </option>
    );

    return (
      <div >
        <div className="row">
            <div className="col-md-5">
              <div className={styles['search-input-container']}>
                <FormControl className={styles['search-input']}
                   type="text" placeholder="Search" onChange={(e)=>{
                      this.props.fetchUsers(
                        this.props['usersRights'].current['projectId'],
                        e['target'].value.trim().replace(/['"]+/g,''),
                        this.props['usersRights'].filters['usersRight']
                      );
                   }
                }/>
              </div>
            </div>
            <div className="col-md-4">
              <FormControl type="checkbox" id="SelectAll"/>
              <label htmlFor="SelectAll">Select all</label>
              <select onChange={(e)=>{
                this.props.fetchUsers(e['target'].value,
                  this.props['usersRights'].filters['name'],
                  this.props['usersRights'].filters['usersRight']
                );
              }}>{items}</select>
            </div>
            <div className="col-md-3">
              <label>
                <Checkbox onChange={(e)=>{
                   this.props.fetchUsers(
                    this.props['usersRights'].current['projectId'],
                    this.props['usersRights'].filters['name'],
                    (e['target'].checked ? "simples" : "")
                  );
                }}>Read</Checkbox>
              </label>
             <label>
                <Checkbox onChange={(e)=>{
                   this.props.fetchUsers(
                    this.props['usersRights'].current['projectId'],
                    this.props['usersRights'].filters['name'],
                    (e['target'].checked ? "owners" : "")
                  );
                }}>Write</Checkbox>
              </label>
              <Button onClick={()=>{
                this.props.saveProjectUsers(
                  this.props['usersRights'].current['projectId'],{
                    usersRight: this.props['usersRights'].filters['usersRight'],
                    users: this.props['usersRights'].current['users'].owners
                  }
                );
              }}>Save changes</Button>
            </div>
        </div>
      </div>
    )
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {usersRights: state['UsersRightsReducer']};
}

const RightsToolbarConnected = connect(mapStateToProps, mapDispatchToProps)(RightsToolbar);
export default RightsToolbarConnected;