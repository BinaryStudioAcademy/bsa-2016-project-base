import React, { PropTypes } from 'react';
import styles from '../project-view.sass';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

class FeaturesList extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
		return (
			<Table>
			    <TableHeader displaySelectAll={false}>
			      <TableRow className={styles['features-list-header']}>
			        <TableHeaderColumn>Name</TableHeaderColumn>
			        <TableHeaderColumn>Date</TableHeaderColumn>
			        <TableHeaderColumn>Section</TableHeaderColumn>
			        <TableHeaderColumn width={100}>Order</TableHeaderColumn>
			        <TableHeaderColumn width={120}>Nessesary</TableHeaderColumn>
			        <TableHeaderColumn width={120}>Implemented</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    	{this.props.children}
			    </TableBody>
			</Table>
		);
	}
};

export default FeaturesList;