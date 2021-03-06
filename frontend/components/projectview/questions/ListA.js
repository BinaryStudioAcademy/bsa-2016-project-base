import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ProjectViewActions';

import CommentA from './CommentA';

import styles from './list.sass';

class List extends Component {
    constructor(props) {
        super(props);

        this.handleAddATextarea = this.handleAddATextarea.bind(this);
        this.handleAddA         = this.handleAddA.bind(this);
    }

    handleAddATextarea(e) {
        this.props.newMessageInAddATextarea(e.target.value, this.props.index);
    }

    handleAddA() {
        let message = this.props.stateFromReducer.questionsOptions.newMess.newA[this.props.index];
        if (message) {
            var senderInfo = this.props.authUser.userInfo; // данные отправителя
            var newAnswer = {
                author: senderInfo._id,
                text: message
            };
        }
        let id = this.props.stateFromReducer._id;                // _id проекта в БД
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let qId = qCol[i]._id;                                   // _id вопроса в БД
        this.props.addingA(id, newAnswer, senderInfo, this.props.index, qId);
    }

    render() {

        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let qOps = this.props.stateFromReducer.questionsOptions; // вспомогательные переменные раздела вопросов
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос

        let commentText = qOps.newMess.newA[i];

        return(
            <ul className={styles['inner-list']} >
                {aCol.map(function(item, index){
                    return(
                        <li key={index} >
                            <CommentA i={i} index={index} />
                        </li>
                    );
                },this)}
                <li className={styles['comment-new']}>
                    <div className={styles['comment-new-wrap']} >
                        <textarea rows="3"
                                  placeholder={' Give your answer, please'}
                                  value={commentText}
                                  onChange={this.handleAddATextarea}
                        />
                        <div className={styles['comment-options-row']}>
                            <button onClick={this.handleAddA} ><span>send</span></button>
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