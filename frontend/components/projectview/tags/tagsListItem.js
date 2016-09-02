import React, { PropTypes } from 'react';
import styles from '../project-view.sass';

class TagsListItem extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
		return (<span>{this.props['name']}</span>);
	}
};

export default TagsListItem;