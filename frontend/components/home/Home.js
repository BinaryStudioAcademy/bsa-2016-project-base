import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import * as actions from "../../actions/HomeActions";
import SearchHome from './components/SearchHome';
import GeneralInformation from './components/GeneralInformation';
import ListProjects from './components/ListProjects';
import PaginationHome from './components/PaginationHome';

import styles from './home.sass';

class Home extends Component {

	static propTypes = {
		
	};

	componentDidMount() {
		this.props.getAllProjects();
	}

 	render() {
		const { projects } = this.props.data;

	    return (
	    	<div>
				<Row className={ styles.offset }>
					<SearchHome />
				</Row>
				<Row>
					<GeneralInformation projects={ projects } />
				</Row>
				<ListProjects projects={ projects }/>
				<Row>
					<PaginationHome />
				</Row>
	    	</div>
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