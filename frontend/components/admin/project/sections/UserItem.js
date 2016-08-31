import React, { PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/UsersList.sass';


const UserItem = ({user, onAddClick}) => {
    return (
        <div className={styles.listItem}>
            {/*<img src={user.avatar} alt="user avatar"/>*/}
            <div className={styles.userImage}>
                <img src="http://99px.ru/sstorage/1/2016/03/image_12303160026034150433.gif" alt="user avatar"/>
            </div>
            <div className={styles.nameAndPosition}>
                <div className={styles.userName}>{user.userName + " " + user.userSurname}</div>
                <div className={styles.userPosition}>{user.position}</div>
            </div>
            <Button className={styles["btnIcon"]} onClick={(e) => onAddClick(e, user._id)}>
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