import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/EditProjectActions';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Features from './sections/Features';
import Attachments from './sections/Attachments';
import Screenshots from './sections/Screenshots'

import styles from './sections/styles/EditProject.sass';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {toastr} from 'react-redux-toastr';
const Loading = require('react-loading-animation');
import * as constants  from '../../../constants/Api';
const {ORIGIN} = constants;
import { TabPanel, TabBody, TabHead, Button, RaisedButtonUITags } from '../../common/';
import editProjectService from '../../../services/admin/EditProjectService';

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
        "margin-top": "20px"
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




class EditProject extends Component {
    constructor(props) {
        super(props);
        this.updateProject = this.updateProject.bind(this);
        this.state = {
            nameError: false,
            timeBeginError: false,
            technologiesError: false,
            usersError: false
        }
    }
    componentWillReceiveProps(nextProps){
        const {nameError, technologiesError, timeBeginError, usersError} = this.props.store.errors;
        if(nextProps.store.added && !nameError && !technologiesError && !timeBeginError && !usersError) {
            window.scrollTo(0, 0);
            toastr.success('Project', `${nextProps.store.projectName} was updated!`, {
                timeOut: 10000
            });
            //this.props.clearData();
        }
    }
    componentWillMount() {
        this.props.getPredefinedData();
        this.props.initialStateFromDB(this.props.routeParams.id);
    }

    componentWillUnmount() {
        this.props.cleanStore();
    }
    updateProject(e) {
        console.log('createProject');
        const {projectName,projectLink,timeBegin,timeEnd,status,description, projectId} = this.props.store;
        const {predefinedUsers,predefinedTags,predefinedTechnologies,sections,features,files} = this.props.store;
        console.log('features ',features);
        console.log('sections ',sections);

        const inProject = {
            tags: (() => {
                const temp = [];
                predefinedTags.forEach( tag => {
                    if (tag.inProject) temp.push(tag._id)
                });
                return temp;
            })(),
            technologies: (() => {
                const temp = [];
                predefinedTechnologies.forEach( tech => {
                    if (tech.inProject) temp.push(tech._id)
                });
                return temp;
            })(),
            owners: (() => {
                const temp = [];
                predefinedUsers.forEach( user => {
                    if (user.inProject && user.owner)  temp.push(user._id);
                });
                return temp;
            })(),
            users: (() => {
                const temp = [];
                predefinedUsers.forEach( user => {
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
            _id: projectId,
            linkToProject:projectLink,
            projectName,
            /*projectLink,*/
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

        this.props.updateProject(project);
    }






    render() {
        const {initialTags, initialTechnologies, initialUsers, initialSections, initialFiles, projectLink} = this.props.store;
        var load = false;
        if(initialTags && initialTechnologies && initialSections ) {
            load = true;
        }
        return (
            <div id={styles["edit-project-wrapper"]}>
            <div className={"visible-" + !load + " " + "loading-animation"}>
                <Loading />
            </div>
                <div  className={"visible-" + load}>
                <Inputs load={load} fff="2"/>
                <br/>
                <div className={styles['valid-container']}>
                    {this.props.store.errors.technologiesError && <div className={styles.validationTech}><div className={styles.tool}>You must add a technology</div></div>}

                    {this.props.store.errors.usersError && <div className={styles.validationUser} style={this.props.store.errors.technologiesError ? {marginLeft: '3rem'} : {marginLeft: '17rem'}}><div className={styles.tool}>You must add user and owner</div></div>}
                </div>
                <TabsUI/>
                <br/>
                <Attachments/>
                <br/>
                <Screenshots/>
                <br/>
                    <RaisedButtonUITags
                        className={styles.btnCreate}
                        label='Update project'
                        onClick={this.updateProject}
                        backgroundColor='#8D97A4'
                    />
                </div>
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.EditProjectReducer,
    };
};

const EditProjectConnected = connect(mapStateToProps, mapDispatchToProps)(EditProject);
export default EditProjectConnected;