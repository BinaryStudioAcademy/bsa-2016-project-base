import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/ProjectViewActions';
import {connect} from 'react-redux';
import TimeLine from 'material-ui/svg-icons/action/timeline';
import styles from './usersTimeLine.sass';
const LENGTH_ALL_LINE = 87;

class UsersTimeLine extends Component {

    constructor(props) {
        super(props);
        this.createLine = this.createLine.bind(this);
        this.showDateAtLine = this.showDateAtLine.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        //let yy = date.getFullYear() % 100;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return yy+ '-' + mm + '-' + dd ;
    }

    hidePopover() {
        this.refs.popover.style.display = "none";
    }

    showDateAtLine(e) {
        var a = e.target.getBoundingClientRect();
        var numberDaysProject;
        var oneDay = 24*60*60*1000;
        if(this.props.project.timeEnd != null) {
            numberDaysProject = (new Date(this.props.project.timeEnd) - new Date(this.props.project.timeBegin) ) / oneDay;
        } else {
            numberDaysProject = (new Date() - new Date(this.props.project.timeBegin) ) / oneDay;
        }
        var daysInOneProcent = numberDaysProject / 100;

        var lengthHoverLine = Math.sqrt((e.clientX - a.left) * (e.clientX - a.left));
        var lengthAllLine = Math.sqrt((a.right - a.left) * (a.right - a.left));
        var lenthInProcent = lengthHoverLine / (lengthAllLine / 100);
        var allDaysAtHoverLine = daysInOneProcent * lenthInProcent;
        this.refs.popover.style.display = "flex";
        this.refs.popover.style.top += "40px";
        this.refs.popover.style.left = lengthHoverLine + 70 + "px";
        this.refs.popover.innerText = Math.round(allDaysAtHoverLine) + " of days";

    }

    createLine() {
        var self = this,
            oneDay = 24*60*60*1000,
            oneUnit = null,
            numberDaysProject = null,
            arrayUsers;


        if(this.props.project.timeEnd != null) {
            numberDaysProject = (new Date(this.props.project.timeEnd) - new Date(this.props.project.timeBegin) ) / oneDay;
        } else {
            numberDaysProject = (new Date() - new Date(this.props.project.timeBegin) ) / oneDay;
        }
        
        oneUnit = numberDaysProject / LENGTH_ALL_LINE;

        arrayUsers = this.props.users.map(function(el, index) {
            var lineLengthUser,
                dataObj = null,
                numberDaysUser = null,
                userOffset = null;

            el.userHistory.map(function(el) {
                if(el.projectId == self.props.project._id) {
                    dataObj = Object.assign({}, el)
                }
            });

             var dataTo = "now",
                 dataFrom = dataObj.dateFrom;

            if(dataObj.dateTo) {
                numberDaysUser = (new Date(dataObj.dateTo) - new Date(dataObj.dateFrom) ) / oneDay;
                dataTo = dataObj.dateTo
            } else {
                numberDaysUser = (new Date() - new Date(dataObj.dateFrom) ) / oneDay;
            }

             userOffset = (((new Date(dataObj.dateFrom) - new Date(self.props.project.timeBegin)) / oneDay) / oneUnit);

            lineLengthUser = numberDaysUser / oneUnit;
            if(lineLengthUser < 19.5) {
                 return (
                     <div className="userLine" key={index} >
                         <div className="userInfo">
                             <span>{el.userName} {el.userSurname}</span>
                         </div>
                         <div className="offsetLine" style={{flexBasis: userOffset + "%"}}></div>
                         <div className="line tooltip" data-tooltip={"from " + self.formatDate(new Date(dataFrom)) + " to " + (dataTo == "now" ? dataTo : self.formatDate(new Date(dataTo)))} style={{"flex-basis": lineLengthUser + "%"}}>
                         </div>
                     </div>
                 )
             }

            return (
                <div className="userLine" key={index}>
                    <div className="userInfo">
                        <span>{el.userName} {el.userSurname}</span>
                    </div>
                    <div className="offsetLine" style={{flexBasis: userOffset + "%"}}></div>
                    <div className="line"  style={{"flex-basis": lineLengthUser + "%"}}>
                        <span className="userTimeBegin">{self.formatDate(new Date(dataFrom))}</span>
                        <span className="userTimeEnd">{dataTo == "now" ? dataTo : self.formatDate(new Date(dataTo))}</span>
                    </div>
                </div>
            )
        });
        return arrayUsers;
    }

    render() {
        if(!Array.isArray(this.props.users) || !Array.isArray(this.props.owners)) {
            return null;
        }

        var arrayUsers = this.createLine();
        var self = this;

        return (
        <div id="usersTimeLine">
            <div className="headerTimeLine">
                <span className="iconTimeLine">
                </span>
                <span className="textHeader">Users TimeLine</span>
            </div>
            <div className="mainContent">
                <div className="AllUsersLine">
                { arrayUsers }
                </div>
                <div className="dataLine">
                    <div className="dataLine-line" onMouseMove={this.showDateAtLine} onMouseLeave={this.hidePopover}></div>
                    <div className="timeOnLine">
                        <span>{this.formatDate(new Date(this.props.project.timeBegin))}</span>
                        <span>{this.formatDate(new Date(this.props.project.timeEnd))}</span>
                    </div>
                    <div className="popover" ref="popover"></div>
                </div>
            </div>

        </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state) {
    return {
        project: state.ProjectViewReducer,
        users: state.ProjectViewReducer.users,
        owners: state.ProjectViewReducer.owners
    }
}

const UsersTimeLineConnected = connect(mapStateToProps,mapDispatchToProps)(UsersTimeLine);
export default UsersTimeLineConnected;