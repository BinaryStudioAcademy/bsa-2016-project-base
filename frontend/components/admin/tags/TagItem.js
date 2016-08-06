import React, { PropTypes } from 'react';
import { Checkbox } from 'react-bootstrap';

const TagItem = ({tag, selectOne}) => {
    return (
        <div>
            <Checkbox 
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
