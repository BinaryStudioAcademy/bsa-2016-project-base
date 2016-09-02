import React, { PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/UsersList.sass';


const UserItem = ({user, onAddClick}) => {
    return (
        <div id={styles['user-item']}>
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
                <Button className={styles["btnIcon"]} onClick={(e) => onAddClick(e, user._id)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>
            </div>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
};

export default UserItem;