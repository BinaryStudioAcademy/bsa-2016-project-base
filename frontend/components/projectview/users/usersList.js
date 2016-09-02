import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';

import styles from './users.sass';
import userListItem from './usersListItem';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '' };
    }
  
    render() {
        var items = [], users = {}, compare = (marker)=>{
            let array = this['props'].project[marker];
            if(!Array.isArray(array)) return;
            array.forEach((e)=>{
                let flag = true;
                if(this.state['search'].length && ((e['userName'] + e['userSurname'])
                   .toLowerCase().indexOf(this.state['search']) == -1)) flag = false;
                if(flag){
                    e.marker = marker;
                    users[e._id] = e; 
                }
            });
        }
        compare('users');
        compare('owners');
        for(let i in users) items.push(React.createElement(userListItem,{key: i, data: users[i] }));
        return (
            <div id={styles['wrapper']}>
                <div className={styles['input-container']}>
                    <TextField hintText="Search" style={{width:'100%',fontSize:16}}
                        onChange={(e)=>{ 
                            this.setState({ search: 
                                e.target['value'].trim().replace(/\ /g, '').toLowerCase()
                            });
                        }} 
                    />
                    <div className={styles['description']} >  
                        <span className={styles['owners']} />
                        <span>Owner</span>
                        <span className={styles['users']}/>
                        <span>Programmer</span>
                    </div>
                </div>
                <ul className={styles['user-list']}>{items}</ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return { project: state['ProjectViewReducer'] };
}
const UserListConnected = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default UserListConnected; 