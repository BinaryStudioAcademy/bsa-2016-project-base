import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/Tags.sass';

class TagItem extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.tag.inProject !== this.props.tag.inProject;
    }
    renderButton(){
        const {tag, onAddClick, onRemoveClick} = this.props;
        if (tag.inProject) {
            return (
                <div>
                    <Button className={styles["btnIcon"]} onClick={(e) => onRemoveClick(e, tag._id)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </Button>
                </div>
            )
        } else {
             return (
                <div>
                    <Button className={styles["btnIcon"]} onClick={(e) => onAddClick(e, tag._id)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </Button>
                </div>
            )
        }
    }
    render(){
        const {tag} = this.props;
        return (
            <div className={styles["tag"]}>                  
                    <span className={styles["tagName"]}>{tag.tagName}</span>
                    {this.renderButton()}
            </div>
        );
    }
    
};

TagItem.propTypes = {
    tag: PropTypes.object,
    onAddClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
};

export default TagItem;
