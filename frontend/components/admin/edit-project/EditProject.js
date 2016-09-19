import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/EditProjectActions';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Features from './sections/Features';
import Location from './sections/Location';
import Attachments from './sections/Attachments';
import Screenshots from './sections/Screenshots'
import Contacts from './sections/Contacts';

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



class EditProject extends Component {
    constructor(props) {
        super(props);
        this.updateProject = this.updateProject.bind(this);
        this.state = {
            nameError: false,
            timeBeginError: false,
            technologiesError: false,
            usersError: false,
            errors: {nameError: false, technologiesError: false, timeBeginError: false, usersError: false, timeEndError: false}
        }
    }
    componentWillReceiveProps(nextProps){
        const {nameError, technologiesError, timeBeginError, usersError, timeEndError} = this.state.errors;
        //alert(nextProps.store.added);
        if(nextProps.store.added && !nameError && !technologiesError && !timeBeginError && !usersError && !timeEndError) {

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
        const {projectName,projectLink,timeBegin,timeEnd,status,description, projectId, contacts, location} = this.props.store;
        const {predefinedUsers,predefinedTags,predefinedTechnologies,sections,features,files, userStory} = this.props.store;
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
            userHistory: (() => {
                var temp = [];
                var obj = {};
                predefinedUsers.forEach( user => {
                    if (user.inProject == true) {
                        console.log("user.inProject " + user.inProject);
                        temp = user.userHistory.map(function(history) {
                            if(history.projectId == projectId) {
                                return {
                                    projectId: projectId,
                                    dateFrom: userStory[user._id].dateFrom,
                                    dateTo: userStory[user._id].dateTo
                                }
                            } else {
                                return history;
                            }
                        })
                        obj[user._id] = temp;
                    };

                });
                return obj;
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
            })(),
        }

        console.log('inProject.sections ',inProject.sections);
        console.log('inProject.features ',inProject.features);
        console.log('inProject.users ',inProject.users);
        console.log('inProject.owners ',inProject.owners);

        let errors = {};
        if(projectName == "") {
            errors.nameError = true;
        } else {
            errors.nameError = false;
        }

        if(inProject.technologies.length == 0) {
            errors.technologiesError = true;
        } else {
            errors.technologiesError = false;
        }

        if(timeBegin == '') {
            errors.timeBeginError = true;
        } else {
            errors.timeBeginError = false;
        }

        if( timeEnd != null && (new Date(timeBegin) > new Date(timeEnd)) ) {
            errors.timeEndError = true;
        } else {
            errors.timeEndError = false;
        }

        if(inProject.users.length == 0 || inProject.owners.length == 0) {
            errors.usersError = true;
        } else {
            errors.usersError = false;
        }

        if(errors.nameError || errors.technologiesError || errors.timeBeginError || errors.usersError || errors.timeEndError) {
            window.scrollTo(0, 0);
            toastr.error('Bad Request!', {
                timeOut: 10000
            });
        }

        this.state.errors = errors;

        const projectData = {
            userHistory: inProject.userHistory,
        project: {
            _id: projectId,
            location,
            linkToProject:projectLink,
            projectName,
            /*projectLink,*/
            timeBegin: new Date(timeBegin),
            timeEnd: timeEnd == null ? null : new Date(timeEnd),
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
            }
        }


        };
        console.log('project ',projectData);
        this.props.updateProject(projectData, errors);
       // window.scrollTo(0, 0);
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
                <Inputs load={load} fff="2" errors={this.state.errors}/>
                <br/>
                <div className={styles['valid-container']}>
                    {this.state.errors.technologiesError && <div className={styles.validationTech}><div className={styles.tool}>You must add a technology</div></div>}

                    {this.state.errors.usersError && <div className={styles.validationUser} style={this.state.errors.technologiesError ? {marginLeft: '3rem'} : {marginLeft: '17rem'}}><div className={styles.tool}>You must add user and owner</div></div>}
                </div>
                <TabsUI load={load} />
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