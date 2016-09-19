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

        this.handleRemoveQ       = this.handleRemoveQ.bind(this);
        this.handleShowEditQ     = this.handleShowEditQ.bind(this);
        this.handleEditQTextarea = this.handleEditQTextarea.bind(this);
        this.handleEditQCheckBox = this.handleEditQCheckBox.bind(this);
        this.handleSendEditQ     = this.handleSendEditQ.bind(this);
    }

    get canIModify() {
        let can = ( this.props.authUser['userRole'] == 'ADMIN' );
        let owners = this.props.stateFromReducer.owners;
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let expr = qCol[i].question;                             // тело i-ого вопроса
        let authorInfo = expr.author;
        let userInfo = this.props.authUser.userInfo;

        owners.forEach(function(item){
            can = ( can || userInfo._id == item._id );
        });
        can = ( can || userInfo._id == authorInfo._id );

        return can;
    }

    handleRemoveQ() {
        let id = this.props.stateFromReducer._id;                // _id проекта в БД
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let qId = qCol[i]._id;                                   // _id вопроса в БД

        this.props.removingQ(id,i,qId);
    }

    handleShowEditQ() {
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let expr = qCol[i].question;                             // тело i-ого вопроса

        this.props.showEditQ(i,expr.text,qCol[i].isPrivate);
    }

    handleEditQTextarea(e) {
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        this.props.newMessageInEditQTextarea(i,e.target.value);
    }

    handleEditQCheckBox(e) {
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        this.props.newCheckAttrInEditQCheckBox(i,e.target.checked);
    }

    handleSendEditQ() {
        let id = this.props.stateFromReducer._id;                // _id проекта в БД
        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let qId = qCol[i]._id;                                   // _id вопроса в БД
        let message = this.props.stateFromReducer.questionsOptions.editMess[i].editQ.message;
        let checked = this.props.stateFromReducer.questionsOptions.editMess[i].editQ.isChecked;
        if (message) {
            this.props.sendEditQ(id, i, qId, message, checked);
        }
    }

    render() {

        let qCol = this.props.stateFromReducer.questions || [];  // перечень вопросов в проекте
        let i = this.props.index;                                // порядковый номер вопроса в перечне (начинается с нуля, сортировка в порядке добавления)
        let expr = qCol[i].question;                             // тело i-ого вопроса
        let aCol = qCol[i].answers;                              // перечень ответов на i-ый вопрос
        let qOps = this.props.stateFromReducer.questionsOptions; // вспомогательные переменные раздела вопросов
        let showA = qOps.showMess.showA[i];                      // вспомогательный параметр, содержит булевую инфо о развернутости перечня ответов на i-ый вопрос

        let authorInfo = expr.author;
        let authorName = authorInfo.userName + ' ' + authorInfo.userSurname;
        let authorPosition = authorInfo.position;
        let authorLink = authorInfo.globalId;
        let authorAvatarLink = authorInfo.avatar;
        let commentText = expr.text;

        let userInfo = this.props.authUser.userInfo;

        var editingStatus; var checkStatus;
        if ( qOps.editMess[i] != undefined ) {
            if ( qOps.editMess[i].editQ != undefined ) {
                if ( qOps.editMess[i].editQ.isBeingEdited != undefined ) {
                    editingStatus = qOps.editMess[i].editQ.isBeingEdited;
                    checkStatus = qOps.editMess[i].editQ.isChecked;
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
                    <span>q</span>
                </div>
                <div className={styles['comment-content']} >
                    <div className={styles['comment-header']} >
                        <div className={styles['comment-author']} >
                            <Link to={`/api/users/${authorLink}`} className={styles['comment-author-name']} >{authorName}</Link>
                            <span className={styles['comment-author-position']} >{authorPosition}</span>
                        </div>
                        <div className={styles['comment-manipulate']} >
                            { this.canIModify ? !editingStatus ?
                                <button className={styles['comment-manipulate-button']}
                                        onClick={this.handleShowEditQ}
                                >
                                    Edit
                                </button> : null : null
                            }
                            { this.canIModify ? <button className={styles['comment-manipulate-button']}
                                    onClick={this.handleRemoveQ}
                            >
                                Delete
                            </button> : null }
                            <button className={styles['comment-manipulate-button']}
                                    onClick={this.props.handleHideA}
                            >
                                {showA ? 'Hide answers' : 'Show answers'}
                            </button>
                        </div>
                    </div>
                    <div className={styles['comment-body']} >
                        <div className={styles['comment-avatar']} >
                            <Link to={`/api/users/${authorLink}`} className={styles['comment-avatar-link']} >
                                <img src={`/icons/${authorPosition}.png`} alt={`${authorName}`} className={styles['comment-avatar-img']} />
                            </Link>
                        </div>
                        <div className={commentMessageStyle} >
                            <p className={styles['comment-message-text']} >{commentText}</p>
                            <p className={styles['comment-message-date']} >
                                {aCol.length ? aCol.length > 1 ? `${aCol.length} answers have been given.` : `${aCol.length} answer has been given.` : 'No answers have been given yet.' }
                            </p>
                        </div>
                        <div className={commentNewStyle} >
                            <div className={styles['comment-new-wrap']} >
                                <textarea rows="3"
                                          placeholder={' Ask your question, please'}
                                          defaultValue={commentText}
                                          onChange={this.handleEditQTextarea}
                                />
                                <div className={styles['comment-options-row']}>
                                    <div className={styles['comment-privacy-option']} >
                                        <input type="checkbox"
                                               id={`private-check-${i}`}
                                               checked={checkStatus == undefined ? qCol[i].isPrivate : checkStatus}
                                               onChange={this.handleEditQCheckBox}
                                        />
                                        <label htmlFor={`private-check-${i}`}> I want to edit this message as a private one</label>
                                    </div>
                                    <button onClick={this.handleSendEditQ} ><span>send</span></button>
                                </div>
                            </div>
                            
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
    return { 
        stateFromReducer: state.ProjectViewReducer, 
        authUser: state.UserAuthReducer 
    };
}

const CommentConnected = connect(mapStateToProps, mapDispatchToProps)(Comment);
export default CommentConnected;