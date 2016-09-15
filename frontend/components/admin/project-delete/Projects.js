/**
 * Created by razorka on 15.09.16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../../../actions/admin/AdminProjectsDeleteActions";
import ReduxToastr, {toastr} from 'react-redux-toastr'
class ProjectsDeletePage extends  Component{
    constructor(){
        super();
    }
    componentWillMount() {
        this.props.getAllProjectsDelete();
    }

    render() {
        return(
        <h1>Hello</h1>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    console.log(state);
    return {
        state: state.ProjectsDeleteReducer
    };
}
const Projects = connect(mapStateToProps, mapDispatchToProps)(ProjectsDeletePage);
export default Projects;