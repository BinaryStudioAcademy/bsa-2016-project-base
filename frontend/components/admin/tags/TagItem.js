import React, { PropTypes } from 'react';
import { Checkbox, FormControl } from 'react-bootstrap';
import styles from './tags.sass';

const TagItem = ({tag, selectOne}) => {
    let cl
    return (
        
        <div className={styles["tags-item"] + ' ' + (tag.checked ? styles["selected"] : '' )}>
            <FormControl type="checkbox" className={styles['select-checkbox']}
                    name="checkbox" id={tag._id} checked={tag.checked}
                    onChange={(event) => selectOne(event, tag._id)}
            />
            <label htmlFor={tag._id} className={styles['select-label']}>
                    {tag.tagName}
            </label>
        </div>
    );
};

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
    selectOne: PropTypes.func.isRequired
};

export default TagItem;