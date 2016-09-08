import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/ProjectViewActions';
import {connect} from 'react-redux';
import styles from './usersTimeLine.sass';

class UsersTimeLine extends Component {

    constructor(props) {
        super(props);
    this.createLine = this.createLine.bind(this);
    }

    createDataLine(dataBegin, dataEnd, status) {

    }

    createLine() {
        var self = this;
        var oneDay = 24*60*60*1000;
        const LENGTH_ALL_LINE = 88;
        var numberDaysProject = '';
        if(this.props.project.timeEnd != null) {
            numberDaysProject = Math.round((new Date(this.props.project.timeEnd) - new Date(this.props.project.timeBegin) ) / oneDay);
        } else {
            numberDaysProject = Math.round((new Date() - new Date(this.props.project.timeBegin) ) / oneDay);
        }
        console.log("numberDaysProject - " + numberDaysProject);

        var oneUnit = numberDaysProject / LENGTH_ALL_LINE;

        var arrayUsers = this.props.users.map(function(el, index) {
            var lineLengthUser;
            var dataObj = '';
            el.userHistory.map(function(el) {
                if(el.projectId == self.props.project._id) {
                    dataObj = Object.assign({}, el)
                }
            });

            var numberDaysUser = '';
            if(dataObj.dateTo) {
                numberDaysUser = Math.round((new Date(dataObj.dateTo) - new Date(dataObj.dateFrom) ) / oneDay);
            } else {
                numberDaysUser = Math.round((new Date() - new Date(dataObj.dateFrom) ) / oneDay);
            }

            console.log("numberDaysUser - " + numberDaysUser);

            lineLengthUser = numberDaysUser / oneUnit;
            console.log("lineLengthUser - " + lineLengthUser);

            return (
                <div className="userLine">
                    <div className="userInfo">
                        <span>{el.userName} </span>
                        <span>{el.userSurname}</span>
                    </div>
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
            { arrayUsers }
        <div className="dataLine">
            <div className="dataLine-line"></div>
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