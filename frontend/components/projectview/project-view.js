import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import { connect } from 'react-redux';
import * as actions from "./project-view-actions.js";
import SimpleSlider from './carousel.js'

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
            <div>
		    	<div className={styles.info}>
		    		<Panel header="Project Summary:" bsStyle="success" className={styles.brief}>
		    			<Table striped bordered condensed hover>
						    <tbody>
						      <tr>
						        <td><u>Project Name:</u></td>
						        <td>First Binary web-project</td>
						        <td className={styles.tdbut}><Button bsStyle="success"><Glyphicon glyph="edit"/></Button></td>
						      </tr>
						      <tr>
						        <td><u>Stage:</u></td>
						        <td>Completed</td>
						        <td className={styles.tdbut}><Button bsStyle="success"><Glyphicon glyph="edit"/></Button></td>
						      </tr>
						      <tr>
						        <td><u>Started:</u></td>
						        <td>01.08.2016</td>
						        <td className={styles.tdbut}><Button bsStyle="success"><Glyphicon glyph="edit"/></Button></td>
						      </tr>
						      <tr>
						        <td><u>Completed:</u></td>
						        <td>15.09.2016</td>
						        <td className={styles.tdbut}><Button bsStyle="success"><Glyphicon glyph="edit"/></Button></td>
						      </tr>
						      <tr>
						        <td><u>Condition:</u></td>
						        <td>In use</td>
						        <td className={styles.tdbut}><Button bsStyle="success"><Glyphicon glyph="edit"/></Button></td>
						      </tr>
						      <tr>
						        <td><u>Average Rating:</u></td>
						        <td>5</td>
						      </tr>
						    </tbody>
					  	</Table>
    				</Panel>
    				
    				<Tabs defaultActiveKey={1} className={styles.tabpanels}>
    					<Tab eventKey={1} title="Users/Owners"><Panel className={styles.tabpanels}>Users/Owners list</Panel></Tab>
    					<Tab eventKey={2} title="Technologies"><Panel className={styles.tabpanels}>Technologies list</Panel></Tab>
        				<Tab eventKey={3} title="Tags"><Panel className={styles.tabpanels}>List of Tags</Panel></Tab>
        				<Tab eventKey={4} title="Screenshots">
        					<Panel className={styles.tabpanels}>
	        					<Grid>
									<Row>
									<SimpleSlider />
								 	{/*<Col xs={6} md={3}>
								    	<Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
									</Col>
								 	<Col xs={6} md={3}>
								    	<Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
								 	</Col>
								 	<Col xs={6} md={3}>
								    	<Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
								 	</Col>*/}
								  </Row>
								</Grid>
        					</Panel></Tab>
        				<Tab eventKey={5} title="Features"><Panel className={styles.tabpanels}>Table of features</Panel></Tab>
        				<Tab eventKey={6} title="Ratings"><Panel className={styles.tabpanels}>Table of rates</Panel></Tab>
        				<Tab eventKey={7} title="Description"><Panel className={styles.tabpanels}>Description</Panel></Tab>
  					</Tabs>
    				<div>
				    	<Panel header="Questions and Answers" bsStyle="info">
				      		<Accordion>
    							<Panel header="Question #1" eventKey="1" className={styles.questions}>
      								<u>Answer:</u> Anim pariatur cliche reprehenderit, 
      								enim eiusmod high life accusamus terry richardson ad squid.
      								3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
      								Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
      								sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
      								shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes 
      								anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. 
    							</Panel>
    							<Panel header="Question #2" eventKey="2" className={styles.questions}>
      								<u>Answer:</u> Anim pariatur cliche reprehenderit, enim eiusmod high 
      								life accusamus terry richardson ad squid. 3 wolf moon officia aute, 
      								non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt 
      								laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on 
      								it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim 
      								keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente 
      								ea proident. Ad vegan excepteur butcher vice lomo.
    							</Panel>
							    <Panel header="Question #3" eventKey="3" className={styles.questions}>
							      <u>Answer:</u> Anim pariatur cliche reprehenderit, enim eiusmod high life 
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
		    		<Button bsStyle="success">Back to Project List</Button>
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