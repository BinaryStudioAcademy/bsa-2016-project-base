import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/project-view-actions.js';
import Screenshots from './gallery/gallery.js';
import TechnologiesList from './technologies/technologiesList.js';
import TagsList from './TagsList.js';
import UserList from './users-component/users_list';
import styles from './project-view.sass';
import EstimationFile from "./estimationFile/EstimationFileReceiverComponentWithLinkField"
import Questions from './questions/Questions'; // QuestionsStatic is just for static representation
import { Accordion, Button, Panel, Nav, NavItem, Tabs, Tab, Table, Grid, Row, Col, Thumbnail, Glyphicon } from 'react-bootstrap';
import FaList from 'react-icons/lib/fa/list';


class ProjectView extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log('ProjectView: componentWillMount');
        //debugger;
        const aquiredProjectId = this.props.routeParams.id;
        this.props.getProject(aquiredProjectId);
    }

    componentDidMount() {
        console.log('ProjectView: componentDidMount');
    }

    shouldComponentUpdate(){
    	return true;
    }

    formatDate(date) {
	  let dd = date.getDate();
	  if (dd < 10) dd = '0' + dd;
	  let mm = date.getMonth() + 1;
	  if (mm < 10) mm = '0' + mm;
	  //let yy = date.getFullYear() % 100;
	  let yy = date.getFullYear();
	  if (yy < 10) yy = '0' + yy;
	  return dd + '-' + mm + '-' + yy;
	}

	// tabClick(){
	// 	//alert('Test');
	// 	this.props.getProjectTags();
	// }

    render() {
    	//let idview = $r.props.location.pathname.match('/project-view/i');
    	//const { projectsRestPath, selectedProjectId } = this.props.rootState.ProjectViewReducer;
    	let currentProject = (this.props.rootState.ProjectViewReducer.currentProject) ?
    		this.props.rootState.ProjectViewReducer.currentProject : 'none';

    	let viewProjectName = (currentProject == 'none') ? 'Loading... please wait!' : currentProject.projectName;
		//let fullDescription = (currentProject == 'none') ? 'Loading... please wait!' : currentProject.description[0].descrFullText;
		  let fullDescription = "It is a long established fact that a reader will be distracted by the readable " +
			  "content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less" +
			  " normal distribution of letters, as opposed to using 'Content here, content here', making it look like " +
			  "readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their" +
			  " default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. " +
			  "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour " +
			  "and the like).";
    	let viewStageName = (currentProject == 'none') ? 'Loading... please wait!' : currentProject.stage.stageName;
			let viewStartedDate = (currentProject == 'none') ? 'Loading... please wait!' : this.formatDate(new Date(currentProject.timeBegin));
			let viewEndDate = (currentProject == 'none') ? 'Loading... please wait!' : this.formatDate(new Date(currentProject.timeEnd));
			let viewCondition = (currentProject == 'none') ? 'Loading... please wait!' : currentProject.condition.conditionName;
		//let viewUsers = (currentProject !== 'none') ? currentProject.users.toString() : 'Users list: Loading... please wait!';
			let viewUsers = (currentProject == 'none') ? 'Users list: Loading... please wait!' : 'Users list: ...under develop.';
		//let viewOwners = (currentProject !== 'none') ? currentProject.owners.toString() : 'Owners list: Loading... please wait!';
			let viewOwners = (currentProject == 'none') ? 'Owners list: Loading... please wait!' : 'Owners list: ...under develop.';
    	// console.log("Selected property 'projectsRestPath' from central storage: ", projectsRestPath);
    	// console.log("Selected property 'selectedProjectId' from central storage: ", selectedProjectId);
    	// console.log("Selected property 'listProjects' from central storage: ", this.props.rootState.ProjectViewReducer.projectList);
    	console.log('ProjectView -> render() -> currentProject.projectName: ', currentProject.projectName);
    	return (
            <div id={styles["project-view-content"]}>

				<div className="projectMain">
					<div className="firstPart">
						<span  className="nameProject">{viewProjectName}</span>
						<span className="tags"><TagsList/></span>
						<div className="fullDescriptionProject">
							{fullDescription}
						</div>
						<span className="technologies">
							<TechnologiesList />
						</span>
						<div className="screenshots">
							<Screenshots />
						</div>
					</div>
				</div>

				<div className="tableDescriptionProject">
					{/*<table>
						<tbody>
						<tr>
							<td>Stage:</td>
							<td><span>{viewStageName}</span></td>
						</tr>
						<tr>
							<td>Started:</td>
							<td><span>{viewStartedDate}</span></td>
						</tr>
						<tr>
							<td>Completed:</td>
							<td><span>{viewEndDate}</span></td>
						</tr>
						<tr>
							<td>Condition:</td>
							<td><span>{viewCondition}</span></td>
						</tr>
						<tr>
							<td>Average Rating:</td>
							<td><span>5</span></td>
						</tr>
						</tbody>
					</table>
					*/}
					<div title="Users/Owners" >
						<UserList />
					</div>
				</div>




			    	<div className={styles.info}>

        				<div eventKey={5} title="Features" onClick={this.props.getProjectFeatures}><div>Table of features</div></div>
        				<div eventKey={6} title="Ratings"></div>
						<Questions id="q-and-a" questions={currentProject.questions} />
			    		<Button className={styles.btn} href='/'>Back to Project List</Button>
			    	</div>
			    </div>
          )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        rootState: state
    };
}
const ProjectViewConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectView);
export default ProjectViewConnected;

//export default ProjectView;