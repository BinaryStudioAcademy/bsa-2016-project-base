import {connect} from 'react-redux';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import styles from './usersTimeLine.sass';
import * as actions from '../../../actions/ProjectViewActions';

class UsersTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locale: {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            },oneDay: 24 * 36 * 100000
        };
        this.createLine = this.createLine.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
        this.showDateAtLine = this.showDateAtLine.bind(this);
    }

    hidePopover() {
        this.refs.popover.style.display = "none";
    }

    showDateAtLine(e) {
        let rect = e['target'].getBoundingClientRect(),
            lengthHoverLine = (e.clientX - rect.left),
            beginDate = new Date(this.props['project'].timeBegin),
            numberDaysProject = ((this.props['project'].timeEnd != null) ?
                (new Date(this.props['project'].timeEnd) - beginDate) : (new Date() - beginDate));

        this.refs.popover.style.display = "block";
        this.refs.popover.style.left = lengthHoverLine + 70 + "px";
        this.refs.popover.innerText = Math.round(numberDaysProject / this.state['oneDay'] * lengthHoverLine / (rect.right - rect.left)) + " days";
    }

    dateFormat(date){
        if(date != null) {
            return (new Date(date)).toLocaleString("en-US",this.state['locale']);
        } else {
            return new Date().toLocaleString("en-US",this.state['locale']);
        }

    }

    createLine() {
        const {users, owners, timeEnd,timeBegin} = this.props['project'];
        //if(!users  || !owners) return null;
        var usersLocal, ownersLocal;
        users == null ? usersLocal = [] : usersLocal = [...users];
        owners == null ? ownersLocal = [] : ownersLocal = [...owners];
        const usersAndOwners = [...usersLocal];
        const usersId = usersLocal.map(function (el) {
            return el._id;
        });
        ownersLocal.forEach(function(el) {
            if(usersId.indexOf(el._id) == -1) {
                usersAndOwners.push(el);
            }
        });


        var numberDaysProject = ((timeEnd != null) ?
                    (new Date(timeEnd) - new Date(timeBegin)):
                    (new Date() - new Date(timeBegin))) / this.state['oneDay'],
            oneUnit  = numberDaysProject / 82,
            arrayUsers = usersAndOwners.map((el, index)=>{
                if(typeof el != 'object') return null;
                var dataObj = null, dateTo = "Now",numberDaysUser = new Date();
                el['userHistory'].find((item)=>{
                    if(item.projectId == this.props['project']._id)
                        dataObj = item;
                });

                if(dataObj.dateTo) {
                    dateTo = this.dateFormat(dataObj.dateTo);
                    numberDaysUser = new Date(dataObj.dateTo);
                }

                let userOffset = (((new Date(dataObj.dateFrom) - new Date(timeBegin)) / this.state['oneDay']) / oneUnit),
                    lineLengthUser = ((numberDaysUser - new Date(dataObj.dateFrom))/ this.state['oneDay'] /oneUnit);

                return (<div className={styles["userLine"]} key={index}>
                    <div className={styles["userInfo"]}>
                        <label>{el.userName} {el.userSurname}</label>
                    </div>
                    <div className={styles["offsetLine"]} style={{flexBasis: userOffset + "%"}}/>
                    <div className={styles["line"]}  style={{flexBasis: lineLengthUser + "%"}}>
                        <span>{"From  " + this.dateFormat(dataObj.dateFrom) + "  to  " + dateTo}</span>
                    </div>
                </div>);
            });
        return arrayUsers;
    }

    render() {
        return (
            <div id="usersTimeLine">
                <header className={styles['usersTimeLines-Header']}>
                    <h2> & TimeLines</h2>
                </header>
                <div className={styles["mainContent"]}>
                    <div className={styles["allUsers-Lines"]}>{this.createLine()}</div>
                    <div className={styles["dataLine"]}>
                        <div className="dataLine-line" onMouseMove={this.showDateAtLine} onMouseLeave={this.hidePopover}></div>
                        <div className={styles["timeOnLine"]}>
                            <label>{this.dateFormat(this.props['project'].timeBegin)}</label>
                            <label>{this.dateFormat(this.props['project'].timeEnd)}</label>
                        </div>
                        <div className={styles["popover"]} ref="popover"/>
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
    return { project: state['ProjectViewReducer'] }
}

const UsersTimeLineConnected = connect(mapStateToProps,mapDispatchToProps)(UsersTimeLine);
export default UsersTimeLineConnected;