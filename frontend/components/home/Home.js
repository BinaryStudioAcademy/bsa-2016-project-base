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

	sortByParams(e) {
		const target = e.target;
		this.props.getAllProjectsSorted(target.value);
	}

	pageSelect(e) {
		this.props.setActionPage(e);
	}

 	render() {
		const { search, pagination } = this.props.data;
		const { filteredProjects, technologies, sumFilterProj, cntAllProjectFil } = this.props.filtered;

	    return (
	    	<div id={styles.homeContent}>
		  		<section id={styles.sectionContent}>
		    		<SearchHome
		    			filter = {::this.filterProject}
						filterByTech = {::this.filterByTech}
						orderBy = {::this.sortByParams}
						search = {search}
						technologies = {technologies}
					/>
					<ListProjects
			  			projects={ filteredProjects }
			  		/>
					<PaginationHome
			  			activePage={ pagination.activePage }
			  			sumPages = { sumFilterProj }
			  			pageSelect = {::this.pageSelect}
			  		/>
		  		</section>
			</div>
	    )
	}
}

function getOnlySelectedTechProject (products, filterTech) {
	if (!filterTech.length) return products;

	return products.filter(product =>
		product.technologies.filter(tech => !!~filterTech.indexOf(tech.techName)).length
	);
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

function getPaginationConfig(projects, config) {
	let countProjects = projects.length,
	pageCount = Math.ceil(countProjects/config.perpage);
	if(!pageCount) pageCount = 1;
	if(config.activePage > pageCount) config.activePage = pageCount;
	let startPos = (config.activePage - 1) * config.perpage;
	return {
		countProjects: countProjects,
		pageCount: pageCount,
		startPos: startPos,
		perpage: config.perpage
	}
}

function getPagesProjects (projects, config) {
	const {startPos, perpage} = config;

	return projects.filter((project, key) => {
		return key >= startPos && key < (perpage + startPos);
	});
}

const HomeConnected = connect(

	state => {

		let allProducts = state.HomeReducer.projects,
			{search, filterTech, pagination} = state.HomeReducer;
		let filteredProjects = getFilteredProjects(allProducts, search),
			technologies = getFilteredTechnologies(filteredProjects);
		filteredProjects =  getOnlySelectedTechProject(filteredProjects, filterTech);
		const configPage = getPaginationConfig(filteredProjects, pagination);
		filteredProjects = getPagesProjects(filteredProjects, configPage);

		return {data: state.HomeReducer, filtered: {filteredProjects: filteredProjects, technologies: technologies, sumFilterProj: configPage.pageCount, cntAllProjectFil: configPage.countProjects}};
	},
	dispatch => bindActionCreators(actions, dispatch)
)(Home);
export default HomeConnected;