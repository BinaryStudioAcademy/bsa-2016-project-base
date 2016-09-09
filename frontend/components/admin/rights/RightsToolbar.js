/* general */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/admin/UsersRightsActions';


/* component */
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import CheckBox from '../../common/CheckBox-ui.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from '../../common/RaisedButton-ui.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* styles */
import styles from './Rights.sass';

class RightsToolbar extends React.Component {

    constructor(props) {
    	super(props);
        this.state = {
          projectListStyles:{
                backgroundColor: "white", 
                webkitAppearance: "none"
            }
        }
    }

    componentWillMount(){
        this.props.fetchProjectsList(true);
    }

    render() {
        let menuProjectsItems = new Array();
        const {projectsList,current,filters} = this.props['usersRights'];
        for(let i in projectsList) menuProjectsItems.push(
            <MenuItem key={projectsList[i].id}  primaryText={projectsList[i].projectName}
                style={this.state['projectListStyles']} value={projectsList[i].id} />);

        return (
            <div className={styles['rights-toolBar']}>
                <RaisedButton label="Save changes" onClick={()=>{
                    this.props.saveProjectUsers(current['projectId'],{
                        users: current['users'],
                        usersRight: filters['usersRight']
                    });
                }}  autoWidth={false} />
                <CheckBox label="Write" checked={(filters['usersRight'] == 'owners')}
                    onCheck={(e)=>{
                        let right = "";
                        if(e.target['checked']) right = "owners";
                        this.props.fetchUsers(current['projectId'],filters['name'],right);
                    }} className={styles['filters-CheckBox']} />    
                <CheckBox label="Read" checked={(filters['usersRight'] == 'simples')}
                    onCheck={(e)=>{
                        let right = "";
                        if(e.target['checked']) right = "simples";
                        this.props.fetchUsers(current['projectId'],filters['name'],right);
                    }} className={styles['filters-CheckBox']} />  
                <MuiThemeProvider>
                    <TextField floatingLabelText="Filter by users` name"
                      value={filters['name']} onChange={(e)=>{
                          this.props.fetchUsers(current['projectId'],
                              e['target'].value.trim().replace(/['"]+/g,''),
                              filters['usersRight']
                          );
                      }}  className={styles['filters-TextInput']} />
                </MuiThemeProvider>   
                <MuiThemeProvider>
                    <DropDownMenu value={current['projectId']} className={styles['projects-list']} 
                        onChange={(event, index, value)=>{
                            this.props.fetchUsers(value,filters['name'],filters['usersRight']);
                        }}
                    >{menuProjectsItems}</DropDownMenu>
                </MuiThemeProvider>
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return { usersRights: state['UsersRightsReducer'] };
}

const RightsToolbarConnected = connect(mapStateToProps, mapDispatchToProps)(RightsToolbar);
export default RightsToolbarConnected;
