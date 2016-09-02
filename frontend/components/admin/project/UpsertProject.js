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
import styles from './sections/styles/UpsertProject.sass';
import {toastr} from 'react-redux-toastr';
//import styles from './sections/styles/UpsertProject.sass';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        "margin-top": "40px"
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
            toastr.success('Project', `${nextProps.store.projectName} was added!`);
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
                    temp.push({
                        name: file.name,
                        link: file.path
                    });
                });
                console.log('temp ',temp);
                return temp;
            })()
        }
        console.log('inProject.sections ',inProject.sections);
        console.log('inProject.features ',inProject.features);
        console.log('inProject.users ',inProject.users);
        console.log('inProject.owners ',inProject.owners);
        const project = {
            projectName,
            /*projectLink,*/
            timeBegin: new Date(timeBegin),
            timeEnd: new Date(timeEnd),
            attachments: inProject.attachments,
            sections: inProject.sections,
            features: inProject.features,
            tags: inProject.tags,
            technologies: inProject.technologies,
            owners: inProject.owners,
            users: inProject.users,
            status,
            description,
           
        };
        console.log('project ',project);
        /*const project = {
            users: ["57a262f6b42bbf5a2daa98c1"],
            owners: ["57a262f6b42bbf5a2daa98c1"],
            technologies : ["57a2f5f3d50c16908d4e0c2f"],
            tags: ["57a26314b42bbf5a2daa9970"],
            projectName : "Cool Web Projects",
            isCompleted: false,
            timeBegin: new Date('2014-02-09'),
            timeEnd: new Date('2015-02-09'),
            stage : "57a2fac7d50c16908d4e0c33", 
            condition : "57ac5379204135dfe49f780b",     
            description: [{
                descrText: 'Short desc!',
                descrFullText: '<p>long description goes here!</p>'
            }],
        }*/

     this.props.postProject(project);
	}
	





 	render() {
        console.log('Rerender Upsert');
	    return (
	    	<div id={styles['add-project-wrapper']}>
	    		<Inputs/>
        		<br/>
        		<TabsUI />
                <br/>
                <Attachments/>
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
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpsertProject);
