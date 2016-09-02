import React, { PropTypes } from 'react';
import styles from '../project-view.sass';
import {TableRowColumn, TableRow} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionMinus from 'material-ui/svg-icons/content/remove';

class FeaturesListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        	year: 'numeric',
  			month: 'long',
  			day: 'numeric'
		};
    }

    render(){
    	let item = this.props.data;
    	return (
			<TableRow>
				<TableRowColumn>{item['featureName']}</TableRowColumn>
				<TableRowColumn>{(new Date(item.created)).toLocaleString("en-US",this.state)}</TableRowColumn>
				<TableRowColumn>{item['section'].name}</TableRowColumn>
				<TableRowColumn width={100}>{item['featureOrder']}</TableRowColumn>
				<TableRowColumn className={styles['feature-item-column-center']}>{(item.isNessesary ? 
						<ActionDone className={styles['feature-checked']}/> :
						<ActionMinus className={styles['feature-notChecked']}/> )}
				</TableRowColumn>
				<TableRowColumn className={styles['feature-item-column-center']}>{(item.isImplemented ?
					<ActionDone className={styles['feature-checked']}/> : 
					<ActionMinus className={styles['feature-notChecked']}/> )}
				</TableRowColumn>
			</TableRow>
		);
	}
};
export default FeaturesListItem;