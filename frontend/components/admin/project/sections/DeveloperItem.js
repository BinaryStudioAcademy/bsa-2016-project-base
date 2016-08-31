import React, { PropTypes } from 'react';
import { Button, Checkbox } from '../../../common/';
import styles from './styles/DeveloperItem.sass';

const DeveloperItem = ({user, onRemoveClick, onCheckboxChange}) => {
    return (
        <div id={styles['developer-item']}>
            <div className={styles['flex-avatar']}>
                <img src={user.avatar} alt="user avatar"/>
            </div>
            <div className={styles['flex-info']}>
                <span>
                    <div>{user.userName + ' ' + user.userSurname}</div>
                    <div>{user.position}</div>
                </span>
            </div>
            <div className={styles['flex-btn']}>
                <Checkbox label="Owner" checked={user.owner} onChange={(e) => onCheckboxChange(e, user._id)}/>
            </div>
            <div className={styles['flex-btn']}>
                <Button onClick={(e) => onRemoveClick(e, user._id)}>
                	<i className="fa fa-trash-o" aria-hidden="true"></i>
                </Button>
            </div>
        </div>
    );
};

DeveloperItem.propTypes = {
    user: PropTypes.object,
    onRemoveClick: PropTypes.func.isRequired
};

export default DeveloperItem;