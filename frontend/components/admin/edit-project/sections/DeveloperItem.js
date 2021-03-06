import React, { Component, PropTypes } from 'react';
import { Button, Checkbox } from '../../../common/';
import styles from './styles/UsersList.sass';
import { DEFAULT } from '../../../../constants/Api';

import CheckBoxUI from '../../../common/CheckBox-ui';

class DeveloperItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            defaultImage: DEFAULT + "user.png"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.user.owner
        });
    }
    /*shouldComponentUpdate(nextProps, nextState){
        return nextState.checked != this.state.checked || nextProps.selected != this.props.selected;
    }*/
    render(){
        const {user, onRemoveClick, onCheckboxChange, onUserSelect, selected} = this.props;

        return (
            <div className={styles.listItem + ' ' + (selected ? styles["user-selected"] : '' )} onClick={(e) => onUserSelect(e, user._id)}>
                {/*<img src={user.avatar} alt="user avatar"/>*/}
                <div className={styles.userImage}>
                    <img src={ this.state.defaultImage } alt="user avatar"/>
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
    selected: PropTypes.bool,
    onRemoveClick: PropTypes.func.isRequired
};

export default DeveloperItem;
