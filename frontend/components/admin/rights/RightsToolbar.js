/* general */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/admin/UsersRightsActions';
import AutoComplete from 'material-ui/AutoComplete';


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
        const {projectsList,current,filters,updated} = this.props['usersRights'];
        for(let i in projectsList) menuProjectsItems.push(
            <MenuItem key={projectsList[i].id}  primaryText={projectsList[i].projectName}
                style={this.state['projectListStyles']} value={projectsList[i].id} />);
        return (
            <div className={styles['rights-toolBar']}>
                <RaisedButton label="Save changes" onClick={()=>{
                    this.props.saveProjectUsers(current['projectId'],{
                        users: updated,
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
                    <AutoComplete  className={styles['projects-list']}
                        floatingLabelText="Input project name"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={projectsList.map(item => item.projectName)}
                        openOnFocus={true}
                        listStyle={{WebkitAppearance:"none"}}
                        style={{WebkitAppearance:"none"}}
                        menuStyle={{WebkitAppearance:"none"}}
                        maxSearchResults={12}
                        searchText={((projectsList.length) ? 
                            projectsList[0].projectName : "" )}
                        onNewRequest={(item,index)=>{
                            if (index < 0) return;
                            this.props.fetchUsers(
                                projectsList[index].id,
                                filters['name'],
                                filters['usersRight']
                            );
                        }}
                    />

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