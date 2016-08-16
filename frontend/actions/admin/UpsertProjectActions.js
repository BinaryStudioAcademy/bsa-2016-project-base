import * as types from './UpsertProjectActionTypes';


export function changeProjectName(name) {
    return {
        type: types.CHANGE_PROJECT_NAME,
        name
    };
};

export function changeProjectLink(link) {
    return {
        type: types.CHANGE_PROJECT_LINK,
        link
    };
};

export function changeStartDate(date) {
    return {
        type: types.CHANGE_START_DATE,
        date
    };
};

export function changeFinishDate(date) {
    return {
        type: types.CHANGE_FINISH_DATE,
        date
    };
};

export function changeCondition(option) {
    return {
        type: types.CHANGE_CONDITION,
        option
    };
};


export function changeDescription(text) {
    return {
        type: types.CHANGE_DESCRIPTION,
        text
    };
};

export function addUserToProject(_id) {
    return {
        type: types.ADD_USER_TO_PROJECT,
        _id
    };
};

export function removeUserFromProject(_id) {
    return {
        type: types.REMOVE_USER_FROM_PROJECT,
        _id
    };
};

export function changeOwnership(_id, checked) {
    return {
        type: types.CHANGE_OWNERSHIP,
        _id,
        checked
    };
};