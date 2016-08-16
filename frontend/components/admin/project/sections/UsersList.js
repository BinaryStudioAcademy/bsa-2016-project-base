import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import DropDown from '../../../common/DropDown';
import Button from '../../common/Button';
import UserItem from './UserItem';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
        this.onSelectValue = this.onSelectValue.bind(this);
        this.addUserToProject = this.addUserToProject.bind(this);
        this.removeUserFromProject = this.removeUserFromProject.bind(this);
        this.onOwnershipChange = this.onOwnershipChange.bind(this);
    }
    onSelectValue(e){
        console.log('onSelectValue ',e.target.value);
        this.setState({
                userId: e.target.value
        });
    }
    addUserToProject(e) {
        console.log('addUserToProject ',userId);
        const { userId } = this.state;
        if (userId) {
            this.props.addUserToProject(userId);
            this.setState({
                userId: ''
            });
        } 
    }
    removeUserFromProject(e, userId) {
        console.log('removeUserFromProject ',userId);
        if (userId) this.props.removeUserFromProject(userId);
    }
    onOwnershipChange(e, userId) {
        console.log('onOwnershipChange ',userId);
        const checked = e.target.checked;
        if (userId) this.props.changeOwnership(userId, checked);
    }
    render() {
        const { users } = this.props.store;
        let opts = [];
    	const list = users.map(user => {
            if (user.inProject) {
                return (
                    <UserItem 
                        user={user} 
                        key={user._id} 
                        onRemoveClick={this.removeUserFromProject}
                        onCheckboxChange={this.onOwnershipChange}
                    />
                );
            } else {
                opts.push({
                    value: user._id,
                    name:user.name
                });
            }
            
        });
        return (
            <span>
                <DropDown data={opts} onChange={this.onSelectValue}/>
                <Button value="Add" onClick={this.addUserToProject}/>
             	{list}
            </span>
        );
    }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);