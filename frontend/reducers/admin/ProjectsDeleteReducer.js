/**
 * Created by razorka on 15.09.16.
 */
import * as types from '../../actions/admin/AdminProjectsDeleteActionsTypes';
const initialState = {
    listOfProjects: []
};


export default function ProjectsDeleteReducer(state = initialState, action) {
    switch (action.type) {
        case types.INIT_PROJECTS_FOR_DELETE: {
            const {listOfProjects} = action;
            console.log(listOfProjects);
            return Object.assign({}, state, {
                listOfProjects
            })
        }
        default: {
            return state;
        }
    }
}