import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead, Button, RaisedButtonUITags } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
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
		console.log('createProject');
        const {projectName,projectLink,timeBegin,timeEnd,status,description} = this.props.store;
        const {users,tags,technologies,sections,features,files} = this.props.store;
        console.log('features ',features);
        console.log('sections ',sections);

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
                    if (user.inProject && user.owner)  temp.push(user._id);
                });
                return temp;
            })(),
            users: (() => {
                const temp = [];
                users.forEach( user => {
                    if (user.inProject) temp.push(user._id);
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
                console.log('files ',files);
                files.forEach( file => {
                    if (file.target === 'file') {
                        temp.push({
                            name: file.name,
                            link: file.path
                        });
                    }
                    
                });
                console.log('temp ',temp);
                return temp;
            })(),
            screenshots: (() => {
                const temp = [];
                console.log('files ',files);
                files.forEach( file => {
                    if (file.target === 'screenshot') {
                        temp.push(file.path);
                    }
                    
                });
                console.log('temp ',temp);
                return temp;
            })(),
            descrFullText: (() => {
                const text = description.descrFullText;
                return text.replace(/<img src="upload/g,'<img src="'+ORIGIN+'/upload');
            })()

            
        }
        console.log('inProject.sections ',inProject.sections);
        console.log('inProject.features ',inProject.features);
        console.log('inProject.users ',inProject.users);
        console.log('inProject.owners ',inProject.owners);
        const project = {
            projectName,
            linkToProject:projectLink,
            timeBegin: new Date(timeBegin),
            timeEnd: new Date(timeEnd),
            attachments: inProject.attachments,
            screenShots: inProject.screenshots,
            sections: inProject.sections,
            features: inProject.features,
            tags: inProject.tags,
            technologies: inProject.technologies,
            owners: inProject.owners,
            users: inProject.users,
            status: status.value,
            description: {
                descrFullText: inProject.descrFullText
            } 
           
        };
        console.log('project ',project);
        this.props.postProject(project);
	}
	





 	render() {
        console.log('Rerender Upsert');
        console.log(this.props.store);
	    return (
	    	<div id={styles['add-project-wrapper']}>
	    		<Inputs/>
        		<br/>
                <div className={styles['valid-container']}>
                {this.props.store.errors && this.props.store.errors.technologies && <div className={styles.validationTech}><div className={styles.tool}>{this.props.store.errors.technologies}</div></div>}

               {this.props.store.errors && (this.props.store.errors.users || this.props.store.errors.owners) && <div className={styles.validationUser} style={this.props.store.errors.technologies ? {marginLeft: '3rem'} : {marginLeft: '17rem'}}><div className={styles.tool}>{this.props.store.errors.users || this.props.store.errors.owners}</div></div>}
                </div>
        		<TabsUI />
                <br/>
                <Attachments/>
                <br/>
                <Screenshots/>
                <br/>
                <RaisedButtonUITags
                    className={styles.btnCreate}
                    label='Create project'
                    onClick={this.createProject}
                    backgroundColor='#8D97A4'
                />
	    	</div>
	    )
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    console.log(state);
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpsertProject);
