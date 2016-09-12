/* general */
import styles from './project-view.sass';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../actions/ProjectViewActions';

/* developers components */
import TagsList from './tags/tagsList';
import Gallery from './gallery/gallery';
import UsersList from './users/usersList';
import Attachment from "./attachment/View";
import Questions from './questions/Questions';
import TagsListItem from './tags/tagsListItem';
import UsersListItem from './users/usersListItem';
import FeaturesList from './features/featuresList';
import SimilarProjects from "./similarProjects/View";
import FeaturesListItem from './features/featuresListItem';
import TechnologiesList from './technologies/technologiesList';
import TechnologiesListItem from './technologies/technologiesListItem';
import UsersTimeLine from './usersTimeLine/UsersTimeLine';
import EstimationFile from "./estimationFile/EstimationFileReceiverComponentWithLinkField";

/* icons */
import FaPlus from 'react-icons/lib/fa/plus';
import FaList from 'react-icons/lib/fa/list';
import FaMinus from 'react-icons/lib/fa/minus'; 

import ActionUndo from 'material-ui/svg-icons/content/undo';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import TimeLine from 'material-ui/svg-icons/action/timeline';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* material-ui components */
import {Link} from 'react-router';

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
        this.props.getProject(
            this.props['routeParams'].id,
            this.props['project'].filters
        );
    }

    render() {
        const {features,users,filters} = this.props['project'];
        let featuresItems = [], usersItems = [];
        if(features) features.forEach((item)=>{ 
            let options = {
                ref: item._id,
                key: item._id,
                data: item,
                onClick: ()=>{
                    let tempFilters = Object.assign({},filters), flag = true;
                    if(filters.feature == item._id){
                        tempFilters['feature'] = null;
                        flag = false;
                    }
                    if(flag){
                        let index = features.findIndex(el => el._id == item._id);
                        if(!features[index].childFeatures.length) return;
                        tempFilters['feature'] = item._id;
                    }
                    this.props.getProject(this.props['routeParams'].id,tempFilters);
                }
            };
            if(filters['feature'] == item._id) options['className'] = "featureItem-Main";
            featuresItems.push(React.createElement(FeaturesListItem,options));
        });

        if(users) users.forEach((item)=>{
            usersItems.push(<UsersListItem id={item._id} key={item._id} data={item} />);
        }); 

    	return (
            <div id={styles["project-view-content"]}>
                <div className={styles['secondRow']}>
                    <UsersList>{usersItems}</UsersList>
                    <FeaturesList>{featuresItems}</FeaturesList>
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
    	project: state['ProjectViewReducer'] 
    };
}

const ProjectViewConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectView);
export default ProjectViewConnected;
