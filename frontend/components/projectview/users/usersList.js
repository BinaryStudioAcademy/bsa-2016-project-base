import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ProjectViewActions';

import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from '../project-view.sass';

class UserList extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const {_id,filters} = this.props['project'],
            right = filters['user'].right;
        let tempFilters = Object.assign({},filters);
        return (
            <div className={styles['usersList-Container']}>
                <div className={styles['usersList-filterTab']}>
                    <div className={styles['usersList-SearchInputContainer']}>
                        <MuiThemeProvider>
                            <TextField floatingLabelText="Search" fullWidth={true} onChange={(e)=>{ 
                                tempFilters['user'].name = e.target['value'].trim().replace(/\ /g, '').toLowerCase();
                                alert();
                                this.props.getProject(_id,tempFilters);
                            }} />
                        </MuiThemeProvider>
                    </div>
                    <div className={styles['usersList-Description']}>  
                        <span className={styles['owners']} />
                        <span className={((right == "owners") ? "checked" : "default")} onClick={()=>{
                            tempFilters['user'].right = ((right != "owners") ? "owners" : "");
                            this.props.getProject(_id,tempFilters);
                        }}>Owner</span>
                        <span className={styles['users']}/>
                        <span className={((right == "simples") ? "checked" : "default")} onClick={()=>{
                            tempFilters['user'].right = ((right != "simples") ? "simples" : "");
                            this.props.getProject(_id,tempFilters);
                        }}>Programmer</span>
                    </div>
                </div>
                <ul className={styles['usersList-Content']}>{this.props.children}</ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return { 
        project: state['ProjectViewReducer'] 
    };
}
const UserListConnected = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default UserListConnected; 