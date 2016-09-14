import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ProjectViewActions';

import ListQ from './ListQ';

import styles from './questions.sass';
import styles_anime from './animation.sass';

class Questions extends Component {
    constructor(props){
        super(props);

        this.handleHideQ = this.handleHideQ.bind(this);
    }

    get qIsShown() {
        return this.props.stateFromReducer.questionsOptions.showMess.showQ;
    }

    handleHideQ() { // свернуть/развернуть перечень вопросов, по умолчанию развернут
        this.props.showOrHideQ();
    }

    render() {

        let qCol = this.props.stateFromReducer.questions || []; // перечень вопросов в проекте

        return(
            <div id={this.props.id} >
                <div className={styles['section-title']} >
                    Questions & Answers
                    {qCol.length ?
                        <button onClick={this.handleHideQ} >
                            {this.qIsShown ? 'Hide questions' : 'Show questions'}
                        </button> : null
                    }
                </div>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.qIsShown ? <ListQ /> : null }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return { stateFromReducer: state.ProjectViewReducer };
}

const QuestionsConnected = connect(mapStateToProps, mapDispatchToProps)(Questions);
export default QuestionsConnected;