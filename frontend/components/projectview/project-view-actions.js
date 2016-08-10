export function getListProjects(projectId) {
    const action = {
        type: 'PW_GET_LIST_PROJECTS'
    };
    return action;
}


export function getProject(projectId) {
    const action = {
        type: 'PW_GET_PROJECT'
    };
    return action;
}