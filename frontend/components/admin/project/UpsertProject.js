import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/admin/UpsertProjectActions';
import { TabPanel, TabBody, TabHead } from '../../common/';
import Inputs from './sections/Inputs';
import UsersList from './sections/UsersList';
import Tags from './sections/Tags';
import Techs from './sections/Techs';
import Features from './sections/Features';
import Attachments from './sections/Attachments';

import Button from '../../common/RaisedButtonUI_Tags';
import styles from './sections/styles/UpsertProject.sass';

class UpsertProject extends Component {
	constructor(props) {
	    super(props);
	    this.createProject = this.createProject.bind(this);
	}
    shouldComponentUpdate(){
        return false;
    }
	componentDidMount() {
		this.props.getPredefinedData();
	}
	createProject(e) {
		console.log('createProject');
        const {projectName,projectLink,timeBegin,timeEnd,condition,description} = this.props.store;
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
            })()
        }
        console.log('inProject.sections ',inProject.sections);
        console.log('inProject.features ',inProject.features);
        console.log('inProject.users ',inProject.users);
        const project = {
            projectName,
            /*projectLink,
             files,*/
            timeBegin: new Date(timeBegin),
            timeEnd: new Date(timeEnd),
            stage : "57a2fac7d50c16908d4e0c33", 
            isCompleted: false,
            sections: inProject.sections,
            features: inProject.features,
            tags: inProject.tags,
            technologies: inProject.technologies,
            owners: inProject.users,
            users: inProject.users,
            condition,
            description
        };

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
	    	<div id={styles["upsert-project"]}>
	    		<Inputs/>
        		<br/>
        		<Features/>
        		<br/>
        		<Tags/>
        		<br/>
        		<Techs/>
        		<br/>
        		<UsersList/>
        		<br/>
        		<Attachments/>
        		<br/>
        		<Button
                    label="Create project"
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