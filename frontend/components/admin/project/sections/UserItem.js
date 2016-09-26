import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/UsersList.sass';
import { DEFAULT } from '../../../../constants/Api';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            defaultImage: DEFAULT + "user.png"
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.user.inProject !== this.props.user.inProject;
    }
    render(){
        const {user, onAddClick} = this.props;
        return (
            <div className={styles.listItem}>                
                <div className={styles.userImage}>
                    <img src={ this.state.defaultImage } alt="user avatar"/>
                    {/*<img src={user.avatar} alt="user avatar"/>*/}
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
    }
    
};

UserItem.propTypes = {
    user: PropTypes.object,
    onAddClick: PropTypes.func.isRequired
};

export default UserItem;
