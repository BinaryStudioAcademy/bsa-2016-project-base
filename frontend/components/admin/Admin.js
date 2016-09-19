/* general */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

/* styles */
import styles from './admin.sass';

export default class Admin extends React.Component {

	constructor(props) {
	    super(props);
	}
	
 	render() {
	    return (
	    	<div className={styles.adminContent} id="adminContent">
	    		<div className={styles.row}>
	        	<ul className={styles["tab-bar"]}>
	        		<li key={1}>
	        			<Link to="/admin/rights/" className={
	        				location.pathname == '/admin' ? 
	        				styles["admin-nav-item-active"] : ""
						} activeClassName={styles["admin-nav-item-active"]}>
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
				</div>
	       		{this.props.children}
    		</div>
	    )
	}
};
