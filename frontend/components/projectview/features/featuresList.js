import React from 'react';
import styles from '../project-view.sass';

export default class FeaturesList extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
		return (
			<div className={styles['featuresList-Container']}>
				<div className={styles['featuresList-Header']}>
					<span>Feature name</span>
					<span>Implemented</span>
					<span>Section</span>
					<span>Order</span>
				</div>
				<div className={styles['featuresList-Content']}>
			    	{this.props.children}
			    </div>
			</div>
		);
	}
};
