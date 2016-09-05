import React, { PropTypes } from 'react';
import styles from '../project-view.sass';

class TagsList extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
    	return (
			<div className={styles['project-tags']}>
			   {this.props.children}
			</div>
		);
	}
};

export default TagsList;