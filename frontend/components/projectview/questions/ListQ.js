import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ProjectViewActions';

import ListA from './ListA';
import CommentQ from './CommentQ';

import styles from './list.sass';
import styles_anime from './animation.sass';

class List extends Component {
    constructor(props) {
        super(props);

        this.handleAddQTextarea = this.handleAddQTextarea.bind(this);
        this.handleAddQCheckBox = this.handleAddQCheckBox.bind(this);
        this.handleAddQ         = this.handleAddQ.bind(this);
    }

    handleHideA(i) { // свернуть/развернуть перечень ответов на i-ый вопрос, по умолчанию свернут
        this.props.showOrHideA(i);
    }

    handleAddQTextarea(e) {
        this.props.newMessageInAddQTextarea(e.target.value);
    }

    handleAddQCheckBox(e) {
        this.props.newCheckAttrInAddQCheckBox(e.target.checked);
    }

    handleAddQ() {
        let message = this.props.stateFromReducer.questionsOptions.newMess.newQ.textarea;
        let checked = this.props.stateFromReducer.questionsOptions.newMess.newQ.checkbox;
        if (message) {
            var senderInfo = this.props.authUser.userInfo; // данные отправителя
            var newQuestion = {
                question: {
                    author: senderInfo._id,
                    text: message
                },
                answers: [],
                isPrivate: checked
            };
        }
        let id = this.props.stateFromReducer._id;
        this.props.addingQ(id, newQuestion, senderInfo);
    }

    render() {

        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let qOps = this.props.stateFromReducer.questionsOptions; // вспомогательные переменные раздела вопросов
        let showA = qOps.showMess.showA;                         // вспомогательный массив, содержит булевую инфо о развернутости перечней ответов

        return(
            <ul className={styles['outer-list']} >
                {qCol.map(function(item, index){
                    return(
                        <li key={index} >
                            <CommentQ index={index}
                                      handleHideA={this.handleHideA.bind(this,index)}
                            />
                            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            {showA[index] ? <ListA index={index} /> : null}
                            </ReactCSSTransitionGroup>
                        </li>
                    );
                },this)}
                <li className={styles['comment-new']}>
                    <div className={styles['comment-new-wrap']} >
                        <textarea rows="6"
                                  placeholder={' Ask your question, please'}
                                  onChange={this.handleAddQTextarea}
                        />
                        <div className={styles['comment-options-row']}>
                            <div className={styles['comment-privacy-option']} >
                                <input type="checkbox"
                                       id="private-check"
                                       onChange={this.handleAddQCheckBox}
                                />
                                <label htmlFor="private-check"> I want to sent this message as a private one</label>
                            </div>
                            <button onClick={this.handleAddQ} ><span>send</span></button>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state.ProjectViewReducer,
        authUser: state.UserAuthReducer
    };
}

const ListConnected = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListConnected;