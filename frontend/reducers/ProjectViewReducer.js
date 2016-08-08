const initialState = {

	projectsRestPath: '/api/projects'

}


export default function ProjectViewReducer(state = initialState, action) {
    switch (action.type) {
        case 'PW_GET_LIST_PROJECTS': {
            return Object.assign({}, state, {});
        }

        case 'PW_GET_PROJECT': {
            return Object.assign({}, state, {});
        }

        default: {
            return state;        
        }
    }
}