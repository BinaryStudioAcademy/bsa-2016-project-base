/* general */
import styles from './project-view.sass';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../actions/ProjectViewActions';

/* developers components */
import TagsList from './tags/TagsList';
import Gallery from './gallery/Gallery';
import UsersList from './users/usersList';
import Questions from './questions/Questions';
import TagsListItem from './tags/TagsListItem';
import FeaturesList from './features/FeaturesList';;
import FeaturesListItem from './features/FeaturesListItem';
import TechnologiesList from './technologies/TechnologiesList';
import TechnologiesListItem from './technologies/TechnologiesListItem';
import EstimationFile from "./estimationFile/EstimationFileReceiverComponentWithLinkField";

/* icons */
import FaPlus from 'react-icons/lib/fa/plus';
import FaList from 'react-icons/lib/fa/list';
import FaMinus from 'react-icons/lib/fa/minus'; 

import ActionUndo from 'material-ui/svg-icons/content/undo';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* material-ui components */
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import RaisedButtonUI from '../common/RaisedButton-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, averageRating} from 'material-ui/Table';
import {Link} from 'react-router'


const tabsStyles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
	tabItemContainerStyle: {
		backgroundColor: "#78909C",
	},

	tabBlock: {
	    marginTop: 20,
	}
};

function handleActive(tab) {
	alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class ProjectView extends Component {

    constructor(props){
        super(props);
        this.state = {
        	timeOptions :{
				year: 'numeric',
  				month: 'long',
  				day: 'numeric'
			},
			defaultText:'Loading... please wait!'
        }
    }

    componentWillMount() {
        this.props.getProject(this.props['routeParams'].id);
    }

    render() {
    	let tags = [], technologies=[], features=[];
    	const projectDetail = this.props['project'],
    		  name = (projectDetail['projectName'] ? projectDetail['projectName'] : this.state['undefinedText']),
    		  description = (projectDetail['description'] ? projectDetail.description['descrFullText'] : this.state['undefinedText']);
		
		for(var i in projectDetail.tags) tags.push(<TagsListItem name={projectDetail.tags[i].tagName} key={i} />);
		for(var i in projectDetail.technologies) technologies.push(<TechnologiesListItem key={i} data={projectDetail.technologies[i]} />);
  		for(var i in projectDetail.features) features.push(<FeaturesListItem key={i} data={projectDetail.features[i]} />);
    	return (
            <div id={styles["project-view-content"]}>
            	<div className={styles['project-view-navigation']}>
	            	<div>
	        			<MuiThemeProvider >
	        				<ActionUndo size={13} className={styles['redirect-to-list']} />
	        			</MuiThemeProvider >
	        			<label>Back to projects list</label>
	        		</div>
	        		<div>
	        			<MuiThemeProvider >
	        				<ActionBuild size={10} className={styles['redirect-to-list']} />
	        			</MuiThemeProvider >
	        			<label>	
	        				<Link to={'/edit-project/' + projectDetail['_id']}>Edit</Link>
						</label>
	        		</div>
            	</div>	
				<div className={styles['projectMain']}>
					<div className={styles['project-view-firstPart']}>
						<span className={styles['project-name']}>{name}</span>
						<TagsList>{tags}</TagsList>
						<div className={styles['project-description']} dangerouslySetInnerHTML={{__html: description}}  />
						<TechnologiesList>{technologies}</TechnologiesList>
						<MuiThemeProvider >
							<Tabs tabItemContainerStyle={tabsStyles.tabItemContainerStyle} 
								contentContainerStyle={tabsStyles.tabBlock}>
								<Tab label="General">
									<Table  selectable={false} multiSelectable={false}>
										<TableBody displayRowCheckbox={false}>
											<TableRow>
												<TableRowColumn>Status</TableRowColumn>
												<TableRowColumn>
													{ projectDetail['status'] ? projectDetail['status'] : this.state.undefinedText }
												</TableRowColumn>
											</TableRow>
											<TableRow>
												<TableRowColumn>Started</TableRowColumn>
												<TableRowColumn>{ 
													projectDetail['timeBegin'] ? (new Date(projectDetail['timeBegin'])
													.toLocaleString("en-US",this.state.timeOptions)) : this.state.undefinedText
												}</TableRowColumn>
											</TableRow>
											<TableRow>
												<TableRowColumn>Completed</TableRowColumn>
												<TableRowColumn>
													{ projectDetail['isCompleted'] ? <FaPlus />: <FaMinus /> }
												</TableRowColumn>
											</TableRow>
					                        <TableRow>
					                            <TableRowColumn>Average Rating</TableRowColumn>
												<TableRowColumn>{ 
													projectDetail['timeEnd'] ? (new Date(projectDetail['timeEnd'])
													.toLocaleString("en-US",this.state.timeOptions)) : ""
												}</TableRowColumn>
					                        </TableRow>
										</TableBody>
									</Table>
								</Tab>
								<Tab label="Users">
									<UsersList />
								</Tab>
								<Tab label="Locations">
								</Tab>
								<Tab label="Features">
									<FeaturesList>{features}</FeaturesList>
								</Tab>
								<Tab label="Screenshots" >
									<Gallery data={projectDetail['screenShots']} />
								</Tab>
						        <Tab label="Questions" >
				 					<Questions id="q-and-a" questions={projectDetail['questions']} />
						        </Tab>
							</Tabs>
						</MuiThemeProvider>
					</div>
				</div>
				<div className={styles['button-redirect-container']}>
		    		<RaisedButtonUI 
		    			href="/"
		    			label="Back to Project List"
		    			icon={<ActionUndo  style={{size:14}}/>}
		    			style={{width: '75%'}}
		    		/>
	    		</div>
			</div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return { project: state['ProjectViewReducer'] };
}

const ProjectViewConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectView);
export default ProjectViewConnected;