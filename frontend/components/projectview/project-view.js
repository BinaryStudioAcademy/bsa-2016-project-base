/* general */
import styles from './project-view.sass';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators, combineReducers} from 'redux';
import * as actions from '../../actions/ProjectViewActions';

/* developers components */
import Description from './description/description';
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
import Location from './location/Location';
/* icons */
import FaPlus from 'react-icons/lib/fa/plus';
import FaList from 'react-icons/lib/fa/list';
import FaMinus from 'react-icons/lib/fa/minus'; 
import FaPaperclip from 'react-icons/lib/fa/paperclip';

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

        this.setRate = this.setRate.bind(this);
    }

    componentWillMount() {
        this.props.getProject(
            this.props['routeParams'].id,
            this.props['project'].filters
        );
    }

    getAvgRate(distribution) {

        let pointsAmount = distribution.reduce(function(prev,curr,i){
            return prev + curr * (i+1);
        }, 0);

        let gradesAmount = distribution.reduce(function(prev,curr){
            return prev + curr;
        });

        return { rate : Math.round((pointsAmount/gradesAmount + 0.00001) * 100)/100, voices : gradesAmount};
    }

    setRate(index){

        let newRate = {
            author : this.props.authUser.userInfo._id,
            value : index,
            date : new Date()
        }
        this.props.setRate(this.props.project._id,newRate);
    }

    canISetRate(rateInfo,userInfo){

        let can = rateInfo.reduce(function(prev,curr) {
            return prev || ( curr.author == userInfo._id );
        }, false);
        
        return can; // return false if I can
    }

    render() {
        let featuresItems = [], usersItems = [],tagsItems = [], technologiesItems = [];
        
        const projectDetail = this.props['project'],
            currentFeature = projectDetail['filters'].feature,
            locationData = (projectDetail['location'] ? {
                contacts: projectDetail.contacts,
                location: {
                    lat: +projectDetail['location'].Latitude,
                    lng: +projectDetail['location'].Longitude
                }
            }:{
                contacts:{},
                location:{ lat: 0 , lng: 0}
            }), name = (projectDetail['projectName'] ? projectDetail['projectName'] : this.state['undefinedText']),
            description = (projectDetail['description'] ? projectDetail.description['descrFullText'] : this.state['undefinedText']),
            rating = (projectDetail.rating ?
                    projectDetail.rating.rateInfo.length > 0
                        ?
                    {
                        avgRate : this.getAvgRate(projectDetail.rating.rateDistribution),
                        canISetRate : this.canISetRate(projectDetail.rating.rateInfo, this.props.authUser.userInfo),
                        rateInfo : projectDetail.rating.rateInfo
                    }
                        :
                    {
                        avgRate : {rate:0,voices:0},
                        canISetRate : false,
                        rateInfo : []
                    }
                : { avgRate : {rate:0,voices:0}, canISetRate : false, rateInfo : [] }
            );
   
        if(projectDetail['tags']) projectDetail['tags'].forEach((item,index)=>{
            tagsItems.push(<TagsListItem name={item.tagName} key={index} />);
        });

        if(projectDetail['technologies']) projectDetail['technologies'].forEach((item,index)=>{
            technologiesItems.push(<TechnologiesListItem key={index} data={item} />);
        });

        if(projectDetail['features']) projectDetail['features'].forEach((item,index)=>{ 
            let options = {
                key: index,
                data: item,
                onClick: ()=>{
                    let tempFilters = Object.assign({},projectDetail['filters']),flag = true;
                    if(currentFeature == item._id){
                        tempFilters['features'] = [];
                        flag = false;
                    }
                    if(currentFeature == item._id){
                        tempFilters['features'] = new Array();
                        flag = false;
                    }
                    if(flag){
                        let index = projectDetail['features'].findIndex(el => el._id == item._id),
                            children = projectDetail.features[index].childFeatures;
                        if(!children.length) return;
                        tempFilters['features'] = [item._id];
                        children.forEach((item)=>{ tempFilters['features'].push(item._id); });
                    }
                    console.log(tempFilters['features']);
                    this.props.getProject(this.props['routeParams'].id,tempFilters);
                }
            };
            if(currentFeature == item._id) options['className'] = "featureItem-Main";
            featuresItems.push(React.createElement(FeaturesListItem,options));
        });

        if(projectDetail['owners']) projectDetail['owners'].forEach((item,index)=>{
            if(typeof item != 'object') return;
            usersItems.push(<UsersListItem key={index+item._id} data={item} marker={"owners"}/>);
        });

        if(projectDetail['users']) projectDetail['users'].forEach((item,index)=>{
            if(typeof item != 'object') return;
            if(projectDetail['owners']) {
                var isOwner = projectDetail['owners'].reduce(function(status, current) {
                    return status || ( item._id == current._id );
                }, false);
            }
            if(!isOwner) usersItems.push(<UsersListItem key={index+item._id} data={item} marker={"users"}/>);
        });

    	return (
            <div id={styles["project-view-content"]}>
                <div className={styles['projectMain-Navigation']}>
                    <div>
                        <MuiThemeProvider>
                            <ActionUndo size={13} className={styles['redirect-to-list']} />
                        </MuiThemeProvider>
                        <label>
                            <Link to={'/home/'}>Back to projects list</Link>
                        </label>
                    </div>
                    <div>
                        <MuiThemeProvider>
                            <ActionBuild size={10} className={styles['redirect-to-list']} />
                        </MuiThemeProvider>
                        <label>
                            <Link to={'/edit-project/' + projectDetail['_id']}>Edit</Link>
                        </label>
                    </div>
                </div>
                <div className={styles['projectMain-firstRow']}>
                    <div className={styles["descrpition-row"]}>

                        <Description
                            name={name}
                            tagsItems={tagsItems}
                            description={description}
                            projectDetail={projectDetail}
                            undefinedText={this.state.undefinedText}
                            timeOptions={this.state.timeOptions}
                            rating={rating}
                            technologiesItems={technologiesItems}
                            setRate={this.setRate}
                        />

                        <div className={styles['screenshots-attachments-container']}>
                            <div className={styles['screenshots-block-inner']}>
                                <header className={styles['screenshots-block-header']}>
                                    <h4>Screenshots</h4>
                                </header>
                                <Gallery data={projectDetail['screenShots']} />
                            </div>
                            
                            <div className={styles['attachments-block']}>
                                 <header className={styles['screenshots-block-header']}>
                                    <div className={styles['attach-icon']}>
                                        <FaPaperclip size={19}/>
                                    </div>
                                    <h4>Attachments</h4>
                                </header>
                                <Attachment project={this.props.project}/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles['projectMain-secondRow']}>
                    <UsersList>{usersItems}</UsersList>
                    <UsersTimeLine className={styles['userTimeLines-Container']}/>
                  </div>
                <div className={styles['projectMain-thirdRow']}>
                    <Location data={locationData} />
                    <FeaturesList>{featuresItems}</FeaturesList>
                </div>
                <div className={styles['projectMain-qa-row']}>
                    <Questions id="q-and-a" />
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
        project: state['ProjectViewReducer'],
        authUser: state['UserAuthReducer']
    };
}

const ProjectViewConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectView);
export default ProjectViewConnected;
