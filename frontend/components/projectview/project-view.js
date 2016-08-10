import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import { connect } from 'react-redux';
import * as actions from "./project-view-actions.js";
import SimpleSlider from './carousel.js'
import Screenshots from './gallery/gallery.js'

import styles from './project-view.sass';

import { Accordion, Button, Panel, Nav, NavItem, Tabs, Tab, Table, Grid, Row, Col, Thumbnail, Glyphicon } from 'react-bootstrap';


class ProjectView extends Component {
    constructor(props){
        super(props);
    }


    componentWillMount() {
        console.log('ProjectView: componentWillMount');
    }
    
    componentDidMount() {
        console.log('ProjectView: componentDidMount');
    }


    render() {
    	const { projectsRestPath, selectedProjectId } = this.props.rootState.ProjectViewReducer;
    	console.log("Selected property 'projectsRestPath' from central storage: ", projectsRestPath);
    	console.log("Selected property 'selectedProjectId' from central storage: ", selectedProjectId);
    	return (
          <div className={styles.component}>
			    	<div className={styles.info}>
			    		<Panel header={<span className={styles.header}>Project Summary:</span>} className={styles.brief}>
			    			<Table striped bordered condensed hover>
							    <tbody>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Project Name:</u></td>
							        <td><span className={styles.cell}>First Binary web-project</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Stage:</u></td>
							        <td><span className={styles.cell}>Completed</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Started:</u></td>
							        <td><span className={styles.cell}>01.08.2016</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Completed:</u></td>
							        <td><span className={styles.cell}>15.09.2016</span></td>
							        <td className={styles.tdbut}><Button className={styles.btn}><Glyphicon glyph="edit"/></Button></td>
							      </tr>
							      <tr className={styles.row}>
							        <td><u className={styles.cell}>Condition:</u></td>
							        <td><span className={styles.cell}>In use</span></td>
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
	    					<Panel className={styles.tabpanels}>
	    							Users/Owners list
	    						</Panel></Tab>
	    					<Tab className={styles.tabs} eventKey={2} title="Technologies"><Panel className={styles.tabpanels}>Technologies list</Panel></Tab>
	        				<Tab eventKey={3} title="Tags"><Panel className={styles.tabpanels}>List of Tags</Panel></Tab>
	        				<Tab eventKey={4} title="Screenshots">
	        					<Panel className={styles.tabpanels}>
	        					<div className={styles.gallery}>
											<Screenshots />
										</div>
		        				
	        					</Panel></Tab>
	        				<Tab eventKey={5} title="Features"><Panel className={styles.tabpanels}>Table of features</Panel></Tab>
	        				<Tab eventKey={6} title="Ratings"><Panel className={styles.tabpanels}>Table of rates</Panel></Tab>
	        				<Tab eventKey={7} title="Description"><Panel className={styles.tabpanels}>Description</Panel></Tab>
	  					</Tabs>
	    				<div>
					    	<Panel header={<span className={styles.questionHeader}>Questions and Answers</span>}  className={styles.questionPanel}>
					      		<Accordion>
	    							<Panel header={<span className={styles.questionItem}><span className={styles.userName}>Author: </span> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid?</span>} eventKey="1" className={styles.questions}>
	      								<u className={styles.userName}>Answer author:</u> Anim pariatur cliche reprehenderit, 
	      								enim eiusmod high life accusamus terry richardson ad squid.
	      								3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
	      								Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
	      								sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
	      								shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes 
	      								anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. 
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