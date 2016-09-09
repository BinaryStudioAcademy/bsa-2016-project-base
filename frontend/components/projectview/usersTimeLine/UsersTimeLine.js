import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/ProjectViewActions';
import {connect} from 'react-redux';
import TimeLine from 'material-ui/svg-icons/action/timeline';
import styles from './usersTimeLine.sass';

class UsersTimeLine extends Component {

    constructor(props) {
        super(props);
    this.createLine = this.createLine.bind(this);
    }

    createDataLine(dataBegin, dataEnd, status) {

    }

    createLine() {
        var self = this,
            oneDay = 24*60*60*1000,
            oneUnit = null,
            numberDaysProject = null,
            arrayUsers;

        const LENGTH_ALL_LINE = 87;

        if(this.props.project.timeEnd != null) {
            numberDaysProject = (new Date(this.props.project.timeEnd) - new Date(this.props.project.timeBegin) ) / oneDay;
        } else {
            numberDaysProject = (new Date() - new Date(this.props.project.timeBegin) ) / oneDay;
        }
        console.log("numberDaysProject - " + numberDaysProject);

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

            if(dataObj.dateTo) {
                numberDaysUser = (new Date(dataObj.dateTo) - new Date(dataObj.dateFrom) ) / oneDay;
            } else {
                numberDaysUser = (new Date() - new Date(dataObj.dateFrom) ) / oneDay;
            }

             userOffset = (((new Date(dataObj.dateFrom) - new Date(self.props.project.timeBegin)) / oneDay) / oneUnit);

            console.log("numberDaysUser - " + numberDaysUser);
            lineLengthUser = numberDaysUser / oneUnit;
            console.log("lineLengthUser - " + lineLengthUser);

            return (
                <div className="userLine">
                    <div className="userInfo">
                        <span>{el.userName} {el.userSurname}</span>
                    </div>
                    <div className="offsetLine" style={{"flex-basis": userOffset + "%"}}></div>
                    <div className="line" style={{"flex-basis": lineLengthUser + "%"}}></div>
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
                <span className="iconTimeLine"><TimeLine style={{color: "#fff"}}/></span>
                <span className="textHeader">Users TimeLine</span>
            </div>
            <div className="mainContent">
                { arrayUsers }
                <div className="dataLine">
                    <div className="dataLine-line"></div>
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