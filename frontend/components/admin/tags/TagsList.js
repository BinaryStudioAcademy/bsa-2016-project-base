import React, { PropTypes } from 'react';
import TagItem from './TagItem';
import styles from './tags.sass';

const TagsList = ({tags, selectOne}) => {

	const list = [];
	if (tags.length) {
		tags.forEach((tag, index) => {
			if (tag.match) list.push(
		    	<TagItem
		    		key={tag._id}
			        tag={tag}
			        selectOne={selectOne}
		      	/>
			);
		});
	}
	
	if (!list.length) {
		return (<p>No tags to display! Add new or change search term!</p>);
	}

	return (
		<div className={styles["tags-list"]}>
		   {list}
		</div>
	);
};

TagsList.propTypes = {
  	tags: PropTypes.array.isRequired,
  	selectOne: PropTypes.func.isRequired
};

export default TagsList;