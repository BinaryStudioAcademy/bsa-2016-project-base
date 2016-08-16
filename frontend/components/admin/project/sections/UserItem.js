import React, { PropTypes } from 'react';
import Checkbox from './common/Checkbox';
import Button from './common/Button';

const UserItem = ({user, onRemoveClick, onCheckboxChange}) => {
    return (
        <div>
            <img src={user.avatar} alt="user avatar"/>
            <span>{user.name}</span>
            <span>{user.position}</span>
            <Checkbox label="Owner" checked={user.owner} onChange={(e) => onCheckboxChange(e, user._id)}/>
            <Button onClick={(e) => onRemoveClick(e, user._id)}>
            	<i className="fa fa-trash-o" aria-hidden="true"></i>
            </Button>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    onRemoveClick: PropTypes.func.isRequired
};

export default UserItem;