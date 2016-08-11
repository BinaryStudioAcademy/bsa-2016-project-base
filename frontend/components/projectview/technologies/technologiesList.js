import React, { PropTypes } from 'react';
import styles from '../project-view.sass';

const arr = [
	{"_id":"57a2f5f3d50c16908d4e0c2f","techName":"ReactJS","techDescription":"React JS is awesome!"},
	{"_id":"57a2f5f3d50c16908d4e0c30","techName":"NodeJS","techDescription":"NodeJS is awesome!"},
	{"_id":"57a2f5f3d50c16908d4e0c31","techName":"MongoDb","techDescription":"MongoDb is awesome!"}];



const TechnologiesList = ({technologies}) => {

	technologies = arr;

	if (!technologies.length) {
		return (<p>No technologies to display! Add new or change search term!</p>);
	}

	const list = technologies.map(technologies => {
		return (			
				<li key={technologies._id}><img width="30" src="http://oracle-academy.org.ua/wp-content/uploads/2016/02/js-logo-badge-256.png" />{technologies.techName}</li>	
		)
	});
	
	
	return (
		<div className={styles["tags-list"]}>
		   {list}
		</div>
	);
};

TechnologiesList.propTypes = {
  	technologies: PropTypes.array.isRequired
};

export default TechnologiesList;