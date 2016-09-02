import React, { Component, PropTypes } from 'react';
import { Button, Checkbox } from '../../../common/';
import styles from './styles/UsersList.sass';

import CheckBoxUI from '../../../common/CheckBox-ui';

class DeveloperItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
                checked: nextProps.user.owner
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.checked !== this.state.checked;
    }
    render(){
        const {user, onRemoveClick, onCheckboxChange} = this.props;
      
       
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
                {/*<Checkbox label="Owner" checked={user.owner} onChange={(e) => onCheckboxChange(e, user._id)}/>*/}
                <CheckBoxUI
                    label="Owner"
                    checked={user.owner}
                    onCheck={(e) => onCheckboxChange(e, user._id)}
                    className={styles.checkbox}
                />
                <Button className={styles["btnIcon"]} onClick={(e) => onRemoveClick(e, user._id)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
            </div>
        );
    }   
};

DeveloperItem.propTypes = {
    user: PropTypes.object,
    onRemoveClick: PropTypes.func.isRequired
};

export default DeveloperItem;
