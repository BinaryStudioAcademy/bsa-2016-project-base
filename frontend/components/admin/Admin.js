import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './admin.sass';

class Admin extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.adminPage}>
		         <Nav bsStyle="pills" justified className={styles["tab-bar"]}>
				 	<LinkContainer to="/admin/rights" className={styles["tab-item"]}>
				    	<NavItem eventKey={1}>Rights</NavItem>
				  	</LinkContainer>
				 	<LinkContainer to="/admin/features" className={styles["tab-item"]}>
				    	<NavItem eventKey={2}>Features</NavItem>
				  	</LinkContainer>
					<LinkContainer to="/admin/sections" className={styles["tab-item"]}>
						 <NavItem eventKey={3}>Sections</NavItem>
					</LinkContainer>
			    	<LinkContainer to="/admin/tags" className={styles["tab-item"]}>
			      		<NavItem eventKey={4}>Tags</NavItem>
			    	</LinkContainer>  
			    	<LinkContainer to="/admin/tech" className={styles["tab-item"]}>
			      		<NavItem eventKey={5}>Techs</NavItem>
			    	</LinkContainer>
			    	<LinkContainer to="/admin/project" className={styles["tab-item"]}>
			      		<NavItem eventKey={6}>Add Project</NavItem>
			    	</LinkContainer>      
				</Nav>
		        <div className={styles["tab-holder"]}>
		       		{this.props.children || <h3>'In this section you can manage predefined stuff and users rights'</h3>}
		        </div>
	    	</div>
	    )
	}
};


export default Admin;
