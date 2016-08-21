import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../../../actions/admin/UsersRightsActions';


import styles from './Rights.sass';
import FaSearch from 'react-icons/lib/fa/search';
import FaCircle from 'react-icons/lib/fa/circle-o';
import FaChecked from 'react-icons/lib/fa/check-circle-o';
import CustomDropDownComponent from './CustomDropDownComponent';

const chBoxStyle = {
  size: 18,
  style:{
    color:'#7A929D',
    cursor:'pointer'
  }
}

class RightsToolbar extends Component {
	constructor(props) {
	    super(props);
	}
  componentWillMount(){
    this.props.fetchProjectsList(true);
  }
 	render() {
    let checkBoxes;
    switch(this.props['usersRights'].filters['usersRight']){
      case 'owners':
        checkBoxes = {
          simples: FaCircle,
          owners: FaChecked
        }
      break;
      case 'simples':
       checkBoxes = {
          simples: FaChecked,
          owners: FaCircle
        }
      break;
      default:
       checkBoxes = {
          simples: FaCircle,
          owners: FaCircle
        }
      break;
    }
    checkBoxes['simples'] = React.createElement(checkBoxes['simples'],Object.assign({
        onClick: ()=>{
          this.props.fetchUsers(
            this.props['usersRights'].current['projectId'],
            this.props['usersRights'].filters['name'],
           (this.props['usersRights'].filters['usersRight'] == 'simples' ? '' : 'simples')
          );  
        }
      },chBoxStyle));

    checkBoxes['owners'] = React.createElement(checkBoxes['owners'],Object.assign({
        onClick: ()=>{
          this.props.fetchUsers(
            this.props['usersRights'].current['projectId'],
            this.props['usersRights'].filters['name'],
           (this.props['usersRights'].filters['usersRight'] == 'owners' ? '' : 'owners')
          ); 
        }
      },chBoxStyle));

    return (
        <div className={styles['rights-searchBar']}>
          <div className={styles['rights-searchWrapper']}>
              <FaSearch size={15} />
              <input type="search" placeholder="Write to users filter"
                  className={styles["rights-searchInput"]}
                  onChange={(e)=>{
                    this.props.fetchUsers(
                      this.props['usersRights'].current['projectId'],
                      e['target'].value.trim().replace(/['"]+/g,''),
                      this.props['usersRights'].filters['usersRight']
                    );
                   }
                 }
              />
          </div> 
          <div className={styles['rights-filterWrapper']}>
            <div>
              <span>Filter by right: </span>
              {checkBoxes['simples']}
              <span>Read</span>
              {checkBoxes['owners']}
              <span>Write</span>
            </div>
            <div>
              <span>Select project: </span>
              <CustomDropDownComponent className={styles['rights-comboBox']}
                data={this.props['usersRights'].projectsList}
                valueField={'id'} visibleField={'projectName'} 
                current={this.props['usersRights'].current['projectId']}
                onItemClick={(projectId)=>{
                  this.props.fetchUsers(
                      projectId,
                      this.props['usersRights'].filters['name'],
                      this.props['usersRights'].filters['usersRight']
                  );
                }}
              />
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


/*

<Button onClick={()=>{
                this.props.saveProjectUsers(
                  this.props['usersRights'].current['projectId'],{
                    usersRight: this.props['usersRights'].filters['usersRight'],
                    users: this.props['usersRights'].current['users'].owners
                  }
                );
              }}>Save changes</Button>
*/