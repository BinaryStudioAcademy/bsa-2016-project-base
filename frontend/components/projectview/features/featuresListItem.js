import React, { PropTypes } from 'react';
import styles from '../project-view.sass';
import FaNessesary from 'react-icons/lib/fa/check';
import FaNotNessesary from 'react-icons/lib/fa/close';

export default class FeaturesListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        	year: 'numeric',
  			month: 'long',
  			day: 'numeric'
		};
    }

    render(){
    	const data = this.props['data'] || {};
        console.log(data.featureName,data.section,"123456");
    	let implementedBox = (data.isImplemented ?
    			<div className={styles['implementedFeature']}>Implemented</div>
    		:   <div>In progress</div>
    	);
    	return (
    		<div onClick={this.props.onClick}>
    			<span>
    				{implementedBox}
    				<span>{(new Date(data.created)).toLocaleString("en-US",this.state)}</span>
    			</span>
    			<span>
    				{data.featureName}
    				<span>{data.descriptionText}</span>
    			</span>
    			<span>{data.isNessesary ? 
    				<FaNessesary className={styles['feature-NessesaryMarker']}/>
    				: <FaNotNessesary/>
    			}</span>
    			<span>{(data.section ? (data.section['name']) : "undefined" )}</span>
    			<span>{data.featureOrder}</span>
    		</div>
		);
	}
};