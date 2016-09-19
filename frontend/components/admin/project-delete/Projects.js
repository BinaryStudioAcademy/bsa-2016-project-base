/**
 * Created by razorka on 15.09.16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../../../actions/admin/AdminProjectsDeleteActions";
import {toastr} from 'react-redux-toastr'
import styles from  './styles.sass';
import {Link} from 'react-router';
class ProjectsDeletePage extends Component {
    constructor() {
        super();
        this.deleteProject = this.deleteProject.bind(this);
    }

    componentWillMount() {
        this.props.getAllProjectsDelete();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listOfProjects: nextProps.state.listOfProjects
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.state.listOfProjects.length !== this.props.state.listOfProjects.length) {
            return true;
        } else {
            return false;
        }
    }

    deleteProject(id){
        let {listOfProjects} = this.props.state;
        let deletedProjects = [];

        listOfProjects.forEach(function (el,indx) {
            if(el._id !== id){
                deletedProjects.push(el);
            }
        });
        const toastrConfirmOptions = {
            onOk: () => this.props.deleteProject(id,deletedProjects),
            onCancel: () => ''
        };
        toastr.confirm('Are you sure about that?', toastrConfirmOptions)
    }

    render() {
        let {listOfProjects} = this.props.state;
        return (
            <div id="projects-delete">
                {(listOfProjects.length > 0) ?
                    <div>
                        { listOfProjects.map((elem, index, array) => {
                            let data_end;
                            let data_start = elem.timeBegin.split('T');
                            if(elem.timeEnd) {
                                data_end = elem.timeEnd.split('T');
                            }
                            return <div key={elem._id} className={styles['project-elem']}>
                                <Link to={'/project-view/' + elem._id}>{elem.projectName}</Link>
                                {

                                    (elem.status === "Completed") ?
                                        <div className={styles["status-completed"]}>
                                            <div className={styles["status-completed-label"]}>Completed</div>
                                        </div> :
                                        <div className={styles["status-inprogress"]}>
                                            <div className={styles["status-inprogress-label"]}>In Progress</div>
                                        </div>
                                }
                                <div className={styles['date_block']}>
                                    <span>Start date :{data_start[0]}</span>
                                    {
                                        (data_end)?<span>End date :{data_end[0]}</span> :''
                                    }
                                </div>
                                <button className={styles['remove_button']} onClick={(ev)=>{this.deleteProject(elem._id)}}>
                                    Remove Project
                                </button>
                            </div>
                        })}
                    </div> : null
                }
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        state: state.ProjectsDeleteReducer
    };
}
const Projects = connect(mapStateToProps, mapDispatchToProps)(ProjectsDeletePage);
export default Projects;