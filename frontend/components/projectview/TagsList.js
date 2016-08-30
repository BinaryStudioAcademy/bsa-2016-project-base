import React, { PropTypes } from 'react';
import styles from './project-view.sass';

const arr =
	[
		{"_id":"57beca5b48f2d4441be741ca","tagName":"Rest"},
		{"_id":"57beca5b48f2d4441be741bd","tagName":"Society"},
		{"_id":"57beca5b48f2d4441be741bc","tagName":"Business"},
		{"_id":"57beca5b48f2d4441be741be","tagName":"Entertainment"}];

/*[
 {"_id":"57a26314b42bbf5a2daa9965","tagName":"Nepali"},
 {"_id":"57a26314b42bbf5a2daa9966","tagName":"Sotho"},
 {"_id":"57a26314b42bbf5a2daa9967","tagName":"Northern Sotho"},
 {"_id":"57a26314b42bbf5a2daa9968","tagName":"Gujarati"},
 {"_id":"57a26314b42bbf5a2daa9969","tagName":"Hebrew"},
 {"_id":"57a26314b42bbf5a2daa996a","tagName":"Dzongkha"},
 {"_id":"57a26314b42bbf5a2daa996b","tagName":"Romanian"},
 {"_id":"57a26314b42bbf5a2daa996c","tagName":"French"},
 {"_id":"57a26314b42bbf5a2daa996d","tagName":"Icelandic"},
 {"_id":"57a26314b42bbf5a2daa996e","tagName":"Swati"},
 {"_id":"57a26314b42bbf5a2daa996f","tagName":"Spanish"},
 {"_id":"57a26314b42bbf5a2daa9970","tagName":"Kashmiri"},
 {"_id":"57a26314b42bbf5a2daa9971","tagName":"Tamil"},
 {"_id":"57a26314b42bbf5a2daa9972","tagName":"French"},
 {"_id":"57a26314b42bbf5a2daa9973","tagName":"Filipino"}];
 */



const TagsList = ({tags}) => {

	tags = arr;

	if (!tags.length) {
		return (<p>No tags to display! Add new or change search term!</p>);
	}

	const list = tags.map(tag => {
		return (
			<span key={tag._id}>
				{tag.tagName + " "} 
		    </span>
		)
	});


	return (
		<div className={styles["tags-list"]}>
			{list}
		</div>
	);
};

TagsList.propTypes = {
	tags: PropTypes.array.isRequired
};

export default TagsList;