import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

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
        const action_case = e.target.value.charAt(0);
        let searchHint;
        switch (action_case) {
            case '#':
                searchHint = 'Search by tags';
                break;
            case '@':
                searchHint = 'Search by users';
                break;
            case '!':
                searchHint = 'Search by technologies';
                break;
            case '~':
                searchHint = 'Search by description';
                break;
            default:
                searchHint = 'Search by projects names & projects date';
                break;
        }
        this.props.filterProjectList(e.target.value,searchHint);
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
        const {search, pagination} = this.props.data;
        const {filteredProjects, technologies, sumFilterProj, cntAllProjectFil,searchHint} = this.props.filtered;
        return (
            <Row>
                <Col className={styles.bk}>
                    <SearchHome
                        filter={::this.filterProject}
                        filterByTech={::this.filterByTech}
                        orderBy={::this.sortByParams}
                        search={search}
                        technologies={technologies}
                        searchHint ={searchHint}
                    />
                    <GeneralInformation
                        cnt={ cntAllProjectFil }/>
                    <ListProjects
                        projects={ filteredProjects }/>
                    <PaginationHome
                        activePage={ pagination.activePage }
                        sumPages={ sumFilterProj }
                        pageSelect={::this.pageSelect}/>
                </Col>
            </Row>
        )
    }
}

function getOnlySelectedTechProject(products, filterTech) {
    if (!filterTech.length) return products;

    return products.filter(product =>
        product.technologies.filter(tech => !!~filterTech.indexOf(tech.techName)).length
    );
}

function getFilteredProjects(allProducts, search) {
    if (search.length < 2) return allProducts;
    const str = search.toLowerCase();
    const action_case = str.charAt(0);
    let action;
    switch (action_case) {
        case '#':
            action = 'tags';
            break;
        case '@':
            action = 'usernames';
            break;
        case '!':
            action = 'technologies';
            break;
        case '~':
            action = 'description';
            break;
        default:
            action = 'default';
            break;
    }
    let filteredData = [];

    let filteredDataHead = [], filteredDataDesc = [];


    allProducts.forEach(function (item, indx) {
        if (action === 'tags') {
            let search_str = str.slice(1);
            item.tags.forEach(function (el, i) {
                if (!!~el.tagName.toLowerCase().indexOf(search_str)) {
                    filteredData.push(item);
                }
            })
        } else if (action === 'usernames') {
            let search_str = str.slice(1);
            item.users.forEach(function (el, i) {
                if (!!~el.userName.toLowerCase().indexOf(search_str)) {
                    filteredData.push(item);
                }
            })
        } else if (action === 'technologies') {
            let search_str = str.slice(1);
            item.technologies.forEach(function (el, i) {
                if (!!~el.techName.toLowerCase().indexOf(search_str)) {
                    filteredData.push(item);
                }
            })
        } else if (action === 'description') {
            let search_str = str.slice(1);
            item.description.forEach(function (el, i) {
                if (!!~el.descrFullText.toLowerCase().indexOf(search_str) || !!~el.descrText.toLowerCase().indexOf(search_str)) {
                    filteredData.push(item);
                }
            })
        } else if (action === 'default') {

            if (!!~item.projectName.toLowerCase().indexOf(str) || !!~item.timeBegin.toLowerCase().indexOf(str)
                || !!~item.timeEnd.toLowerCase().indexOf(str)) {
                filteredData.push(item);
            }

        }
    });

    // allProducts.filter(product => {
    //
    //
    // 	if(action === 'tags'){
    // 		product.tags.forEach(function (el,indx) {
    // 			if(el.tagName.toLowerCase().indexOf(str)){
    // 				filteredData.push(product);
    // 			}
    // 		})
    // 	}
    //
    // 	if(!!~product.projectName.toLowerCase().indexOf(str)) {
    // 		filteredDataHead.push(product);
    // 	} else if (!!~product.description[0].descrText.toLowerCase().indexOf(str)) {
    // 		filteredDataDesc.push(product);
    // 	}
    //
    // 	return false;
    // });

    //console.log(filteredData);

    let data = filteredData.filter(onlyUnique);

    return data;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function getFilteredTechnologies(filteredProjects) {
    let technologies = [];
    filteredProjects.forEach(product => {

        product.technologies.forEach(v => {

            const techName = v.techName;
            if (!!~technologies.indexOf(techName)) return false;
            technologies.push(techName);
        });
    });
    return technologies;
}

function getPaginationConfig(projects, config) {
    let countProjects = projects.length,
        pageCount = Math.ceil(countProjects / config.perpage);
    if (!pageCount) pageCount = 1;
    if (config.activePage > pageCount) config.activePage = pageCount;
    let startPos = (config.activePage - 1) * config.perpage;
    return {
        countProjects: countProjects,
        pageCount: pageCount,
        startPos: startPos,
        perpage: config.perpage
    }
}

function getPagesProjects(projects, config) {
    const {startPos, perpage} = config;

    return projects.filter((project, key) => {
        return key >= startPos && key < (perpage + startPos);
    });
}

const HomeConnected = connect(
    state => {

        let allProducts = state.HomeReducer.projects,
            {search, filterTech, pagination,searchHint} = state.HomeReducer;
        let filteredProjects = getFilteredProjects(allProducts, search),
            technologies = getFilteredTechnologies(filteredProjects);
        filteredProjects = getOnlySelectedTechProject(filteredProjects, filterTech);
        const configPage = getPaginationConfig(filteredProjects, pagination);
        filteredProjects = getPagesProjects(filteredProjects, configPage);

        return {data: state.HomeReducer,
            filtered: {
                filteredProjects: filteredProjects,
                technologies: technologies,
                sumFilterProj: configPage.pageCount,
                cntAllProjectFil: configPage.countProjects,
                searchHint : searchHint
            }
        };
    },
    dispatch => bindActionCreators(actions, dispatch)
)(Home);
export default HomeConnected;