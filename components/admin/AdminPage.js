import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "./actions/adminActions";
import styles from './sass/admin.sass';


class AdminPage extends Component {
	constructor(props) {
	    super(props);
	}
 	render() {
	    return (
	    	<div className={styles.adminPage}>
		        <h1>AdminPage</h1>
		        <div className={styles.tabs}>
		        	<div className={styles.tab}>
		        		<Link to="/admin/rights">Users Rights</Link>
		        	</div>
		        	<div className={styles.tab}>
		        		<Link to="/admin/features">Features</Link>
		        	</div>
		        	<div className={styles.tab}>
		        		<Link to="/admin/tags">Tags</Link>
		        	</div>
		        	<div className={styles.tab}>
		        		<Link to="/admin/tech">Technologies</Link>
		        	</div>
		        	<div className={styles.tab}>
		        		<Link to="/admin/techscope">Technologies Scope</Link>
		        	</div>
		        </div>
		       
		        <div className={styles.tabHolder}>
		       		<h3>{this.props.children || 
		       			'In this section you can manage predefined stuff and users rights'}</h3>
		        </div>
	    	</div>
	    )
	}
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
