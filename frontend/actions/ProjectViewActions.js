import * as types from '../constants/ProjectViewActionTypes';
import projectViewService from '../services/projectViewService';

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

export function showOrHideQ() { 
    return {
        type: types.SHOW_OR_HIDE_Q
    }
}

export function showOrHideA(index) {
    const action = {
        type: types.SHOW_OR_HIDE_A,
        index
    }
    return action;
}

export  function newMessageInAddQTextarea(message) { 
    return {
        type: types.NEW_MESSAGE_IN_ADD_Q_TEXTAREA,
        message
    }
}

export  function newCheckAttrInAddQCheckBox(checkAttr) {
    return {
        type: types.NEW_CHECK_ATTR_IN_ADD_Q_CHECKBOX,
        checkAttr
    }
}

export function addingQ(projectId, newQuestion) {
    return (dispatch) => {
        return projectViewService.addingQ(projectId, newQuestion)
            .then(response => response.json())
            .then(data => {
                newQuestion._id = data.addedId;
                dispatch({
                    type: types.ADDING_Q_SUCCESS,
                    newQuestion: newQuestion
                });
            }).catch(error => {
                dispatch({
                    type: types.ADDING_Q_FAILURE,
                    error
                });
            });
    };
}

export function newMessageInAddATextarea(message, num) { 
    return {
        type: types.NEW_MESSAGE_IN_ADD_A_TEXTAREA,
        message,
        num
    }
}

export function addingA(projectId, newAnswer, num, qId) { 
    return (dispatch) => {
        return projectViewService.addingA(projectId, newAnswer, qId)
            .then(response => response.json())
            .then(data => {
                newAnswer._id = data.addedId;
                dispatch({
                    type: types.ADDING_A_SUCCESS,
                    newAnswer: newAnswer,
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

export function showEditQ(numQ,message,isChecked) { 
    return {
        type: types.NEW_EDIT_Q_IS_SHOWN,
        numQ: numQ,
        message: message,
        isChecked: isChecked
    }
}

export function newMessageInEditQTextarea(numQ,message) { 
    return {
        type: types.NEW_MESSAGE_IN_EDIT_Q_TEXTAREA,
        numQ: numQ,
        message: message
    }
}

export function newCheckAttrInEditQCheckBox(numQ, isChecked) { 
    return {
        type: types.NEW_CHECK_ATTR_IN_EDIT_Q_CHECKBOX,
        numQ: numQ,
        isChecked: isChecked
    }
}

export function sendEditQ(projectId, numQ, qId, message, checked) { 
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

export function showEditA(numQ,numA,message) { 
    return {
        type: types.NEW_EDIT_A_IS_SHOWN,
        numQ: numQ,
        numA: numA,
        message: message
    }
}

export function newMessageInEditATextarea(numQ,numA,message) {
    return {
        type: types.NEW_MESSAGE_IN_EDIT_A_TEXTAREA,
        numQ: numQ,
        numA: numA,
        message: message
    }
}

export function sendEditA(projectId, numQ, qId, numA, aId, message) {
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

export function removingQ(projectId, num, qId) {
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

export function removingA(projectId, numQ, qId, numA, aId) {
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
