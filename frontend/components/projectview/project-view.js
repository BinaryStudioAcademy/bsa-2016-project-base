import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import { connect } from 'react-redux';
import * as actions from './project-view-actions.js';
import Screenshots from './gallery/gallery.js';
import TechnologiesList from './technologies/technologiesList.js';
import TagsList from './TagsList.js';
import UserList from './users-component/users_list';
import styles from './project-view.sass';
import EstimationFileComponent from "../common/estimationFile/EstimationFileReceiverComponent"
import { Accordion, Button, Panel, Nav, NavItem, Tabs, Tab, Table, Grid, Row, Col, Thumbnail, Glyphicon } from 'react-bootstrap';


class ProjectView extends Component {
	
    constructor(props){
        super(props);       
    }

    componentWillMount() {
        console.log('ProjectView: componentWillMount');
        let aquiredProjectId = this.props.location.pathname.substr(this.props.location.pathname.match(/project-view/i).index+13,24);
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

    render() {
    	//let idview = $r.props.location.pathname.match('/project-view/i');
    	//const { projectsRestPath, selectedProjectId } = this.props.rootState.ProjectViewReducer;
    	let currentProject = (this.props.rootState.ProjectViewReducer.currentProject) ? 
    		this.props.rootState.ProjectViewReducer.currentProject : 'none';

    	let viewProjectName = (currentProject == 'none') ? 'Loading... please wait!' : currentProject.projectName;
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
          <div className={styles.component}>
			    	<div className={styles.info}>
			    		<Panel header={<span className={styles.header}>Project Summary:</span>} className={styles.brief}>
			    			<Table striped bordered condensed hover>
							    <tbody>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Project Name:</u></td>
							        <td><span className={styles.cell}>{viewProjectName}</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Stage:</u></td>
							        <td><span className={styles.cell}>{viewStageName}</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Started:</u></td>
							        <td><span className={styles.cell}>{viewStartedDate}</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Completed:</u></td>
							        <td><span className={styles.cell}>{viewEndDate}</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Condition:</u></td>
							        <td><span className={styles.cell}>{viewCondition}</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Average Rating:</u></td>
							        <td><span className={styles.cell}>5</span></td>
							        <td className={styles.tdbut}></td>
							      </tr>
							    </tbody>
						  	</Table>
	    				</Panel>
	    				
	    				<Tabs defaultActiveKey={1} className={styles.tabpanels}>
	    					<Tab eventKey={1} title="Users/Owners">
	    						<Panel>
	    							<UserList />
	    						</Panel>
							</Tab>
	    					<Tab eventKey={2} title="Technologies"><Panel><TechnologiesList /></Panel></Tab>
	        			<Tab eventKey={3} title="Tags"><Panel><TagsList/></Panel></Tab>
	        			<Tab eventKey={4} title="Screenshots">
	        				<Panel>	        					
	        					<div className={styles.gallery}>
											<Screenshots />
										</div>		   
									</Panel>     				
	        			</Tab>
        				<Tab eventKey={5} title="Features"><Panel>Table of features</Panel></Tab>
        				<Tab eventKey={6} title="Ratings"><Panel>Table of rates
						</Panel></Tab>
        				<Tab eventKey={7} title="Description"><Panel>Description</Panel></Tab>
	  					</Tabs>
	    				<div>
					    	<Panel header={<span className={styles.questionHeader}>Questions and Answers</span>}  className={styles.questionPanel}>
					      		<Accordion>
	    							<Panel header={<span className={styles.questionItem}><span className={styles.userName}>Author: </span> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid?</span>} eventKey="1" className={styles.questions}>
	      								<u className={styles.userName}>Answer author:</u> <p>Anim pariatur cliche reprehenderit, 
	      								enim eiusmod high life accusamus terry richardson ad squid.
	      								3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
	      								Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
	      								sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
	      								shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes 
	      								anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.</p>
	    							</Panel>
	    							<Panel header={<span className={styles.userName}>Question #2</span>} eventKey="2" className={styles.questions}>
	      								<u className={styles.userName}>Answer:</u> Anim pariatur cliche reprehenderit, enim eiusmod high 
	      								life accusamus terry richardson ad squid. 3 wolf moon officia aute, 
	      								non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt 
	      								laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on 
	      								it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim 
	      								keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente 
	      								ea proident. Ad vegan excepteur butcher vice lomo.
	    							</Panel>
								    <Panel header={<span className={styles.userName}>Question #3</span>} eventKey="3" className={styles.questions}>
								      <u className={styles.userName}>Answer:</u> Anim pariatur cliche reprehenderit, enim eiusmod high life 
								      accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
								       skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3
								        wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee 
								        nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer 
								        labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
								         butcher vice lomo.
								    </Panel>
	  							</Accordion>
					    	</Panel>
					  	</div>
			    		<Button className={styles.btn}>Back to Project List</Button>
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