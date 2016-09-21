import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead, Button, RaisedButtonUITags } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Location from './sections/Location';
import Contacts from './sections/Contacts';
import Features from './sections/Features';
import Attachments from './sections/Attachments';
import Screenshots from './sections/Screenshots';
import styles from './sections/styles/UpsertProject.sass';
import {toastr} from 'react-redux-toastr';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as constants  from '../../../constants/Api';
const {ORIGIN} = constants;

const tabsStyles = {
  headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    tabItemContainerStyle: {
        backgroundColor: "#8D97A4"
    },

    tabBlock: {
        marginTop: 40
    },
    inkBarStyle: {
        backgroundColor: "#2ecc71"
    }
};

const TabsUI = () => (
<MuiThemeProvider>
  <Tabs tabItemContainerStyle={tabsStyles.tabItemContainerStyle} contentContainerStyle={tabsStyles.tabBlock} inkBarStyle={tabsStyles.inkBarStyle}>
    <Tab label="Tecnologies *" >
      <div>
        <Techs/>
      </div>
    </Tab>
    <Tab label="Users *" >
      <div>
        <UsersList/>
      </div>
    </Tab>
    <Tab label="Sections & Features">
      <div>
        <Features/>        
      </div>
    </Tab>
    <Tab label="Tags" >
      <div>
      <Tags/>
      </div>
    </Tab>
    <Tab label="Location" >
      <div>
      <Location/>
      </div>
    </Tab>
    <Tab label="Contacts" >
      <div>
      <Contacts/>
      </div>
    </Tab>
  </Tabs>
</MuiThemeProvider>
);

                
class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	    this.createProject = this.createProject.bind(this);
	}

    componentWillReceiveProps(nextProps){
        if(nextProps.store.added) {
            window.scrollTo(0, 0);
            toastr.success('Project', `${nextProps.store.projectName} was added!`, {
              timeOut: 10000
            });
            this.props.clearData();
        }
    }
	componentDidMount() {
		this.props.getPredefinedData();
	}
	createProject(e) {
        const {projectName,projectLink,timeBegin,timeEnd,status,description,contacts,location} = this.props.store;
        const {users,tags,technologies,sections,features,files,userStory} = this.props.store;

        const inProject = {
            tags: (() => {
                const temp = [];
                tags.forEach( tag => {
                    if (tag.inProject) temp.push(tag._id)
                });
                return temp;
            })(),
            technologies: (() => {
               const temp = [];
                technologies.forEach( tech => {
                    if (tech.inProject) temp.push(tech._id)
                });
                return temp;
            })(),
            owners: (() => {
                const temp = [];
                users.forEach( user => {
                    if (user.inProject && user.owner)  temp.push(user._id); //&& user.owner
                });
                return temp;
            })(),
            users: (() => {
                const temp = [];
                users.forEach( user => {
                    if (user.inProject && !user.owner) temp.push(user._id);
                });
                return temp;
            })(),
            sections: (() => {
                const temp = [];
                sections.forEach( section => {
                    temp.push(section._id);
                });
                return temp;
            })(),
            features: (() => {
                const temp = [];
                features.forEach( feature => {
                    temp.push(feature._id);
                });
                return temp;
            })(),
            attachments: (() => {
                const temp = [];
                files.forEach( file => {
                    if (file.target === 'file' && file.good) {
                        temp.push({
                            name: file.name,
                            link: file.path
                        });
                    }
                    
                });
                return temp;
            })(),
            screenshots: (() => {
                const temp = [];
                files.forEach( file => {
                    if (file.target === 'screenshot' && file.good) {
                        temp.push(file.path);
                    }
                    
                });
                return temp;
            })(),
            descrFullText: (() => {
                const text = description.descrFullText;
                return text.replace(/<img src="upload/g,'<img src="'+ORIGIN+'/upload');
            })()
        }
        const projectData = {
            userStory,
            project: {
                projectName,
                location,
                linkToProject:projectLink,
                timeBegin: timeBegin ? new Date(timeBegin).setHours(0,0,0,0) : '',
                timeEnd: timeEnd ? new Date(timeEnd).setHours(0,0,0,0) : '',
                attachments: inProject.attachments,
                screenShots: inProject.screenshots,
                sections: inProject.sections,
                features: inProject.features,
                tags: inProject.tags,
                technologies: inProject.technologies,
                owners: inProject.owners,
                users: inProject.users,
                status: status.value,
                contacts,
                description: {
                    descrFullText: inProject.descrFullText
                },
                questions: [],
                rating: {
                    "rateInfo" : [],
                    "rateDistribution" : [0.0,0.0,0.0,0.0,0.0]
                }
            }
        };
        console.log('project ',projectData);
        this.props.postProject(projectData);
        window.scrollTo(0, 0);
	}
	
 	render() {
	    return (
	    	<div id={styles['add-project-wrapper']}>
	    		<Inputs/>
        		<br/>
                <div className={styles['valid-container']}>
                {this.props.store.errors && this.props.store.errors.technologies && <div className={styles.validationTech}><div className={styles.tool}>{this.props.store.errors.technologies}</div></div>}

               {this.props.store.errors && (this.props.store.errors.users || this.props.store.errors.owners) && <div className={styles.validationUser} style={this.props.store.errors.technologies ? {marginLeft: '3rem'} : {marginLeft: '17rem'}}><div className={styles.tool}>{this.props.store.errors.users || this.props.store.errors.owners}</div></div>}
                </div>
        		<TabsUI/>
                <br/>
                <Attachments/>
                <br/>
                <Screenshots/>
                <br/>
                <RaisedButtonUITags
                    className={styles.btnCreate}
                    label='Create project'
                    onClick={this.createProject}
                />
	    	</div>
	    )
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpsertProject);
