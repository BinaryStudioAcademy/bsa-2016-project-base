import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from "../actions/project-actions.js";

import styles from './project-view.sass';

class ProjectView extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log('ProjectView: componentWillMount');
    }
    
    componentDidMount() {
        console.log('ProjectView: componentDidMount');
    }

    render() {
        return (
            <div>
		    	<div className={styles.info}>Projects info:</div>
		    </div>
            )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(actions, dispatch);
// }

// function mapStateToProps(state) {
//     return {
//         stateFromReducer: state
//     };
// }
// const ProjectViewConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectView);
// export default ProjectViewConnected; 

export default ProjectView; 