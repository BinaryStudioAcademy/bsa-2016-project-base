import * as types from '../../constants/UsersRightsActionTypes';

const initialState = {
  currentProjectId:null,
  currentUsers:{
    simples:[],
    owners:[]
  },
  projectList:[]
};

export default function UsersRightsReducer(state = initialState, action) {
    switch(action.type){
      case types.USERS_PROJECT_START_LOADING:
      case types.PROJECTS_LIST_START_LOADING: {
          return Object.assign({}, state, {
              isLoading: true
          });
      }
      case types.USERS_PROJECT_END_LOADING: {
        return Object.assign({},state,{
          currentProjectId: action.projectId,
          currentUsers: {
             simples: action['users'].simples,
             owners:  action['users'].owners
          },
          isLoading: false
        });
      }
      case types.PROJECTS_LIST_END_LOADING: {
        return Object.assign({},state,{
          projectList: action.projectList,
          isLoading: false
        });
      }
      case types.USERS_PROJECT_ERROR_LOADING:
      case types.SAVE_PROJECT_USERS_ERROR:
      case types.PROJECTS_LIST_ERROR_LOADING:{
        return Object.assign({}, state, {
          error: action.error,
          isLoading: false
        });
      }
      case types.SAVE_PROJECT_USERS:
      default: return state;
    }
}