import React, { PropTypes } from 'react';
import { Checkbox, FormControl } from 'react-bootstrap';
import CheckBoxTags from '../../common/CheckBoxUI_Tags';
import styles from './tags.sass';

const TagItem = ({tag, selectOne}) => {
    let cl
    return (

        <div className={styles["tags-item"] + ' ' + (tag.checked ? styles["selected"] : '' )}>
            <CheckBoxTags
                label={tag.tagName}
                onSelect={(event) => selectOne(event, tag._id)}
                checked={tag.checked}
            />
        </div>
    );
};

TagItem.propTypes = {
    tag: PropTypes.object.isRequired,
    selectOne: PropTypes.func.isRequired
};

export default TagItem;