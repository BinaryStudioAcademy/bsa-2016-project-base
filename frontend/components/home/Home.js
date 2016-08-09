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

	filterProject(e) {
		this.props.filterProjectList(e.target.value);
	}

	filterByTech(e) {
		const target = e.target;
		this.props.filterTech(target.value, target.checked);
	}

 	render() {
		const { search } = this.props.data;
		const { filteredProjects, technologies } = this.props.filtered;

	    return (
	    	<Row>
				<Col lg={8} lgOffset={2} className={styles.bk}>
					<SearchHome
						filter = {::this.filterProject}
						filterByTech = {::this.filterByTech}
						search = {search}
						technologies = {technologies} />
					<GeneralInformation
						projects={ filteredProjects } />
					<ListProjects
						projects={ filteredProjects } />
				</Col>
				{/*<Row>*/}
					{/*<PaginationHome />*/}
				{/*</Row>*/}
	    	</Row>
	    )
	}
}

function getFilteredProjects (allProducts, search) {
	if (search.length < 2) return allProducts;

	const str = search.toLowerCase();
	let filteredDataHead = [], filteredDataDesc = [];

	allProducts.filter(product => {

		if(!!~product.projectName.toLowerCase().indexOf(str)) {
			filteredDataHead.push(product);
		} else if (!!~product.description[0].descrText.toLowerCase().indexOf(str)) {
			filteredDataDesc.push(product);
		}

		return false;
	});

	return [...filteredDataHead, ...filteredDataDesc];
}

function getFilteredTechnologies (filteredProjects) {
	let technologies = [];

	filteredProjects.forEach(product => {

		product.technologies.forEach(v => {

			const techName = v.techName;
			if(!!~technologies.indexOf(techName)) return false;
			technologies.push(techName);
		});
	});
	return technologies;
}

const HomeConnected = connect(

	state => {
		const allProducts = state.HomeReducer.projects,
			search = state.HomeReducer.search;
		const filteredProjects = getFilteredProjects(allProducts, search),
			technologies = getFilteredTechnologies(filteredProjects);
		console.log('Filtered:', filteredProjects);
		return {data: state.HomeReducer, filtered: {filteredProjects: filteredProjects, technologies: technologies}};
	},
	dispatch => bindActionCreators(actions, dispatch)
)(Home);
export default HomeConnected;