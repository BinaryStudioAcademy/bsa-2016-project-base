import React, { PropTypes } from 'react';
import { Button } from '../../../common/';


const UserItem = ({user, onAddClick}) => {
    return (
        <div>
            <img src={user.avatar} alt="user avatar"/>
            <span>{user.name}</span>
            <span>{user.position}</span>
            <Button onClick={(e) => onAddClick(e, user._id)}>
            	<i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
};

export default UserItem;