import React, { PropTypes } from 'react';
import { Checkbox } from 'react-bootstrap';
import styles from './tags.sass';

const TagItem = ({tag, selectOne}) => {
    return (
        <div className={styles["tags-item"]}>
            <Checkbox 
                className={styles["tags-checkbox"]}
                checked={tag.checked}
                onChange={(event) => selectOne(event, tag._id)}>
                {tag.tagName}
            </Checkbox>
        </div>
    );
};

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
    selectOne: PropTypes.func.isRequired
};

export default TagItem;