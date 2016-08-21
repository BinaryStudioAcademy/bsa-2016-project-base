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
	    	<div id={styles.adminContent}>
	    		<div className={styles.row}>
	    	  		<header className={styles.adminContentHeader}>
                    		<div>
                        		<FaCog size={20} />
                        		<span>Admin Menu</span>
                    		</div>

		  			</header>
		  		</div>
		  		<div id={styles["admin-section-content"]}>
		  			<div className={styles.row}>
		        		<ul className={styles["tab-bar"]}>
		        			<li key={1}>
		        				<Link to="/admin/rights/" activeClassName={styles["admin-nav-item-active"]}>
		        					Rights
		        				</Link>
		        			</li>
		        			<li key={2}>
		        				<Link to="/admin/tags/" activeClassName={styles["admin-nav-item-active"]}>
		        					Tags
		        				</Link>
		        			</li>
		        			<li key={3}>
		        				<Link to="/admin/tech/" activeClassName={styles["admin-nav-item-active"]}>
		        					Tech
		        				</Link>
		        			</li>
						</ul>

		        		<div className={styles["tab-holder"]}>
		       				{this.props.children || <h3>'In this section you can manage predefined stuff and users rights'</h3>}
		        		</div>
		        	</div>
	    		</div>
	    	</div>
	    )
	}
};


export default Admin;
