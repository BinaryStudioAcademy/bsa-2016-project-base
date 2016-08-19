import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './admin.sass';
import FaCog from 'react-icons/lib/fa/cog';
class Admin extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.adminContent}>
	    	  		<header className={styles.adminContentHeader}>
                    		<div>
                        		<FaCog size={20} />
                        		<span>Admin Menu</span>
                    		</div>
		  			</header>
		  			<div className={styles.heading}>
		  				<h1>Dashboard</h1>
		  			</div>
		        	<ul className={styles["tab-bar"]}>
		        		<li key={1}>
		        			<Link to="/admin/rights/" activeClassName={styles["admin-nav-item-active"]}>
		        				Rights
		        			</Link>
		        		</li>
		        		<li key={2}>
		        			<Link to="/admin/features/" activeClassName={styles["admin-nav-item-active"]}>
		        				Features
		        			</Link>
		        		</li>
		        		<li key={3}>
		        			<Link to="/admin/Sections/" activeClassName={styles["admin-nav-item-active"]}>
		        				Sections
		        			</Link>
		        		</li>
		        		<li key={4}>
		        			<Link to="/admin/tags/" activeClassName={styles["admin-nav-item-active"]}>
		        				Tags
		        			</Link>
		        		</li>
		        		<li key={5}>
		        			<Link to="/admin/tech/" activeClassName={styles["admin-nav-item-active"]}>
		        				Tech
		        			</Link>
		        		</li>
		        		<li key={6}>
		        			<Link to="/admin/project" activeClassName={styles["admin-nav-item-active"]}>
		        				Add  Project
		        			</Link>
		        		</li>
					</ul>
		        	<div className={styles["tab-holder"]}>
		       			{this.props.children || <h3>'In this section you can manage predefined stuff and users rights'</h3>}
		        	</div>
		        </div>
	    )
	}
};


export default Admin;