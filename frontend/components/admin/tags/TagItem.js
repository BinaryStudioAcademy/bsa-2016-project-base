import React, { Component, PropTypes } from 'react';
import { Checkbox, FormControl } from 'react-bootstrap';
import CheckBoxTags from '../../common/CheckBoxUI_Tags';
import styles from './tags.sass';


export default class TagItem extends Component {
    constructor(props){
        super(props)
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.tag.checked !== this.props.tag.checked;
    }
    render() {
        const {tag, selectOne} = this.props;
        return (
            <div className={styles["tags-item"] + ' ' + (tag.checked ? styles["selected"] : '' )}>
                <CheckBoxTags
                    label={tag.tagName}
                    onSelect={(event) => selectOne(event, tag._id)}
                    checked={tag.checked}
                />
            </div>
        );
    }
   
};

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
    selectOne: PropTypes.func.isRequired
};

export default TagItem;