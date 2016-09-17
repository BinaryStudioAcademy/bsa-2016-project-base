import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/ProjectViewActions';
var classNames = require('classnames');

import styles from './comment.sass';

class Comment extends Component {
    constructor(props){
        super(props);

        this.handleRemoveA       = this.handleRemoveA.bind(this);
        this.handleShowEditA     = this.handleShowEditA.bind(this);
        this.handleEditATextarea = this.handleEditATextarea.bind(this);
        this.handleSendEditA     = this.handleSendEditA.bind(this);
    }

    handleRemoveA() {
        let id = this.props.stateFromReducer._id;                // _id проекта в БД
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.i;                                    // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let qId = qCol[i]._id;                                   // _id вопроса в БД
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос
        let j = this.props.index;                                // порядковый номер ответа в перечне (начинается с нуля, сортировка в порядке добавления)
        let aId = aCol[j]._id;                                   // _id ответа в БД
        this.props.removingA(id,i,qId,j,aId);
    }

    handleShowEditA() {
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.i;                                    // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос
        let j = this.props.index;                                // порядковый номер ответа в перечне (начинается с нуля, сортировка в порядке добавления)
        let expr = aCol[j];                                      // тело j-ого ответа

        this.props.showEditA(i,j,expr.text);
    }

    handleEditATextarea(e) {
        let i = this.props.i;                                    // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let j = this.props.index;                                // порядковый номер ответа в перечне (начинается с нуля, сортировка в порядке добавления)
        this.props.newMessageInEditATextarea(i,j,e.target.value);
    }

    handleSendEditA() {
        let id = this.props.stateFromReducer._id;                // _id проекта в БД
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.i;                                    // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let qId = qCol[i]._id;                                   // _id вопроса в БД
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос
        let j = this.props.index;                                // порядковый номер ответа в перечне (начинается с нуля, сортировка в порядке добавления)
        let aId = aCol[j]._id;                                   // _id ответа в БД
        let message = this.props.stateFromReducer.questionsOptions.editMess[i].editA[j].message;
        if (message) {
            this.props.sendEditA(id, i, qId, j, aId, message);
        }
    }

    render() {

        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.i;                                    // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос
        let j = this.props.index;                                // порядковый номер ответа в перечне (начинается с нуля, сортировка в порядке добавления)
        let expr = aCol[j];                                      // тело j-ого ответа
        let qOps = this.props.stateFromReducer.questionsOptions; // вспомогательные переменные раздела вопросов

        let authorInfo = expr.author;
        let authorName = authorInfo.userName + ' ' + authorInfo.userSurname;
        let authorPosition = authorInfo.position;
        let authorLink = authorInfo.globalId;
        let authorAvatarLink = authorInfo.avatar;
        let commentText = expr.text;

        let userInfo = this.props.authUser.userInfo;

        var editingStatus;
        if ( qOps.editMess[i] != undefined ) {
            if ( qOps.editMess[i].editA != undefined ) {
                if ( qOps.editMess[i].editA[j] != undefined ) {
                    if ( qOps.editMess[i].editA[j].isBeingEdited != undefined ) {
                        editingStatus = qOps.editMess[i].editA[j].isBeingEdited;
                    } else {
                        editingStatus = false;
                    }
                } else {
                    editingStatus = false;
                }
            } else {
                editingStatus = false;
            }
        } else {
            editingStatus = false;
        }

        var commentMessageStyle = classNames({
            'comment-message': true,
            'display-none': editingStatus
        });

        var commentNewStyle = classNames({
            'comment-new': true,
            'display-none': !editingStatus
        });

        return(
            <div className={styles['comment-wrapper']} >
                <div className={styles['comment-before']} >
                    <span>a</span>
                </div>
                <div className={styles['comment-content']} >
                    <div className={styles['comment-header']} >
                        <div className={styles['comment-author']} >
                            <Link to={`/api/users/${authorLink}`} className={styles['comment-author-name']} >{authorName}</Link>
                            <span className={styles['comment-author-position']} >{authorPosition}</span>
                        </div>
                        { this.props.authUser['userRole'] == 'ADMIN' || userInfo._id == authorInfo._id ?
                            <div className={styles['comment-manipulate']} >
                                { !editingStatus ?
                                    <button className={styles['comment-manipulate-button']}
                                            onClick={this.handleShowEditA}
                                    >
                                        Edit
                                    </button> : null
                                }
                                <button className={styles['comment-manipulate-button']}
                                        onClick={this.handleRemoveA}
                                >
                                    Delete
                                </button>
                            </div> : null
                        }
                    </div>
                    <div className={styles['comment-body']} >
                        <div className={styles['comment-avatar']} >
                            <Link to={`/api/users/${authorLink}`} className={styles['comment-avatar-link']} >
                                <img src={`/icons/${authorPosition}.png`} alt={`${authorName}`} className={styles['comment-avatar-img']} />
                            </Link>
                        </div>
                        <div className={commentMessageStyle} >
                            <p className={styles['comment-message-text']} >{commentText}</p>
                            {/*<p className={styles['comment-message-date']} >
                                sent/edited at 12:35 20/12/2012
                            </p>*/}
                        </div>
                        <div className={commentNewStyle} >
                            <div className={styles['comment-new-wrap']} >
                                <textarea rows="3"
                                          placeholder={' Give your answer, please'}
                                          defaultValue={commentText}
                                          onChange={this.handleEditATextarea}
                                />
                            </div>
                            <button onClick={this.handleSendEditA} ><span>send</span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return { stateFromReducer: state.ProjectViewReducer, authUser: state.UserAuthReducer };
}

const CommentConnected = connect(mapStateToProps, mapDispatchToProps)(Comment);
export default CommentConnected;