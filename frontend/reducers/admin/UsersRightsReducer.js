import * as types from '../../constants/UsersRightsActionTypes';

const initialState = {
  current:{
    projectId: null,
    users:{}
  },
  projectsList:[],
  filters:{
    name: "",
    usersRight: ""
  }
};

export default function UsersRightsReducer(state = initialState, action) {
    switch(action.type){
        case types.USERS_PROJECT_START_LOADING:
        case types.PROJECTS_LIST_START_LOADING: 
            return Object.assign({}, state, { isLoading: true });
  
        case types.USERS_PROJECT_END_LOADING: 
            return Object.assign({},state,{
                filters: action.filters,
                current: action.current,
                isLoading: false
            });

        case types.INITIALIZE_END_LOADING:
            return Object.assign({},state,{
                projectsList: action.projectsList,
                current: action.current,
                isLoading: false
            });
            
        case types.PROJECTS_LIST_END_LOADING:
            return Object.assign({},state,{
                projectsList: action.projectsList,
                isLoading: false
            });
        
        case types.UPDATE_USER_RIGHT:{
            var newState = Object.assign({},state);
            newState['current'].users[action.key].isOwner = action.value;
            return newState;
        }

        case types.USERS_PROJECT_ERROR_LOADING:
        case types.SAVE_PROJECT_USERS_ERROR:
        case types.PROJECTS_LIST_ERROR_LOADING:
            return Object.assign({}, state, {
                error: action.error,
                isLoading: false
            });

        case types.SAVE_PROJECT_USERS:
        default: return state;
    }
}
