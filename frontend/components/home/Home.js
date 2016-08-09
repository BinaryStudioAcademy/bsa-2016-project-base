import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import * as actions from "../../actions/HomeActions";
import SearchHome from './components/SearchHome';
import GeneralInformation from './components/GeneralInformation';
import ListProjects from './components/ListProjects';
import PaginationHome from './components/PaginationHome';

import styles from './home.sass';

class Home extends Component {

	componentDidMount() {
		this.props.getAllProjects();
	}

 	render() {
		const { projects } = this.props.data;

	    return (
	    	<Row>
				<Col lg={8} lgOffset={2} className={styles.bk}>
					<SearchHome />
					<GeneralInformation projects={ projects } />
					<ListProjects projects={ projects }/>
				</Col>
				{/*<Row>*/}
					{/*<PaginationHome />*/}
				{/*</Row>*/}
	    	</Row>
	    )
	}
}

const HomeConnected = connect(

	state => {
		return {data: state.HomeReducer};
	},
	dispatch => bindActionCreators(actions, dispatch)
)(Home);
export default HomeConnected;