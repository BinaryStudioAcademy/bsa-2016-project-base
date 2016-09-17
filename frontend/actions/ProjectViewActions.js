import projectViewService from '../services/projectViewService';
import * as types from '../constants/ProjectViewActionTypes';

export function getProject(projectId,filters) {
    return (dispatch) => {
        dispatch({ type: types.PROJECT_VIEW_START_LOADING });
        return projectViewService.getProject(projectId,filters)
            .then(response => response.json())
            .then(project => {
                project['filters'] = filters;
                dispatch({
                    type: types.PROJECT_VIEW_END_LOADING,
                    project: project
                });
            }).catch(error => {
                dispatch({
                    type: types.PROJECT_VIEW_ERROR_LOADING,
                    error
                });
            });    
    };
}

export function showOrHideQ() { // развернуть/свернуть вопросы
    const action = {
        type: types.SHOW_OR_HIDE_Q
    }
    return action;
}

export function showOrHideA(index) { // развернуть/свернуть ответы
    const action = {
        type: types.SHOW_OR_HIDE_A,
        index
    }
    return action;
}

export  function newMessageInAddQTextarea(message) { // хранилище поля ввода нового вопроса
    const action = {
        type: types.NEW_MESSAGE_IN_ADD_Q_TEXTAREA,
        message
    }
    return action;
}

export  function newCheckAttrInAddQCheckBox(checkAttr) { // хранилище состояния чекбокса нового вопроса
    const action = {
        type: types.NEW_CHECK_ATTR_IN_ADD_Q_CHECKBOX,
        checkAttr
    }
    return action;
}

export function addingQ(projectId, newQuestion, senderInfo) { // добавление нового вопроса
    return (dispatch) => {
        return projectViewService.addingQ(projectId, newQuestion)
            .then(response => response.json())
            .then(data => {
                newQuestion._id = data.addedId;
                dispatch({
                    type: types.ADDING_Q_SUCCESS,
                    newQuestion: newQuestion,
                    senderInfo
                });
            }).catch(error => {
                dispatch({
                    type: types.ADDING_Q_FAILURE,
                    error
                });
            });
    };
}

export  function newMessageInAddATextarea(message, num) { // хранилище поля ввода нового ответа
    const action = {
        type: types.NEW_MESSAGE_IN_ADD_A_TEXTAREA,
        message,
        num
    }
    return action;
}

export function addingA(projectId, newAnswer, senderInfo, num, qId) { // добавление нового ответа
    return (dispatch) => {
        return projectViewService.addingA(projectId, newAnswer, qId)
            .then(response => response.json())
            .then(data => {
                newAnswer._id = data.addedId;
                dispatch({
                    type: types.ADDING_A_SUCCESS,
                    newAnswer: newAnswer,
                    senderInfo,
                    num: num
                });
            }).catch(error => {
                dispatch({
                    type: types.ADDING_A_FAILURE,
                    error
                });
            });
    };
}

export function showEditQ(numQ,message,isChecked) { // перевод комментария в режим редактирования
    const action = {
        type: types.NEW_EDIT_Q_IS_SHOWN,
        numQ: numQ,
        message: message,
        isChecked: isChecked
    }
    return action;
}

export function newMessageInEditQTextarea(numQ,message) { // хранилище поля ввода редактируемого ответа
    const action = {
        type: types.NEW_MESSAGE_IN_EDIT_Q_TEXTAREA,
        numQ: numQ,
        message: message
    }
    return action;
}

export function newCheckAttrInEditQCheckBox(numQ, isChecked) { // хранилище состояния чекбокса редактируемого ответа
    const action = {
        type: types.NEW_CHECK_ATTR_IN_EDIT_Q_CHECKBOX,
        numQ: numQ,
        isChecked: isChecked
    }
    return action;
}

export function sendEditQ(projectId, numQ, qId, message, checked) { // отправка отредактированного вопроса в БД
    return (dispatch) => {
        return projectViewService.sendingEditedQ(projectId, qId, message, checked)
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: types.EDITING_Q_SUCCESS,
                    numQ: numQ,
                    message: message,
                    isChecked: checked
                });
            }).catch(error => {
                dispatch({
                    type: types.EDITING_Q_FAILURE,
                    error
                });
            });
    };
}

export function showEditA(numQ,numA,message) { // перевод комментария в режим редактирования
    const action = {
        type: types.NEW_EDIT_A_IS_SHOWN,
        numQ: numQ,
        numA: numA,
        message: message
    }
    return action;
}

export function newMessageInEditATextarea(numQ,numA,message) { // хранилище поля ввода редактируемого ответа
    const action = {
        type: types.NEW_MESSAGE_IN_EDIT_A_TEXTAREA,
        numQ: numQ,
        numA: numA,
        message: message
    }
    return action;
}

export function sendEditA(projectId, numQ, qId, numA, aId, message) { // отправка отредактированного ответа в БД
    return (dispatch) => {
        return projectViewService.sendingEditedA(projectId, qId, numA, aId, message)
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: types.EDITING_A_SUCCESS,
                    numQ: numQ,
                    numA: numA,
                    message: message
                });
            }).catch(error => {
                dispatch({
                    type: types.EDITING_A_FAILURE,
                    error
                });
            });
    };
}

export function removingQ(projectId, num, qId) { // удаление вопроса
    return (dispatch) => {
        return projectViewService.removingQ(projectId, qId)
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: types.REMOVING_Q_SUCCESS,
                    num: num
                });
            }).catch(error => {
                dispatch({
                    type: types.REMOVING_Q_FAILURE,
                    error
                });
            });
    };
}

export function removingA(projectId, numQ, qId, numA, aId) { // удаление ответа
    return (dispatch) => {
        return projectViewService.removingA(projectId, qId, aId)
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: types.REMOVING_A_SUCCESS,
                    numQ: numQ,
                    numA: numA
                });
            }).catch(error => {
                dispatch({
                    type: types.REMOVING_A_FAILURE,
                    error
                });
            });
    };
}
