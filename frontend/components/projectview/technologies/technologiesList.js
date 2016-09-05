import React, { PropTypes } from 'react';
import styles from '../project-view.sass';

class TechnologiesList extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
		return (
			<div className={styles['technologies']}>
			   {this.props.children}
			</div>
		);
	}
};

export default TechnologiesList;