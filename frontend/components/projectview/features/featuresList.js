import React from 'react';
import styles from '../project-view.sass';

export default class FeaturesList extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
		return (
			<div className={styles['featuresList-Container']}>
				<header className={styles['featuresList-Header']}>
                    <h2>Features</h2>
                </header>
				<div className={styles['featuresList-ContainerHeader']}>
					<span>Name</span>
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
