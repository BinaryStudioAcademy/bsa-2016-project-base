import * as types from '../constants/AdminUserActionTypes';

const initialState = {
  projectId:null,
  users:{
    simples:[],
   owners:[]
  }
};
export default function UsersRightsReducer(state = initialState, action) {
    switch(action.type){

      case types.USERS_PROJECT_GET_LOADING: {
          return Object.assign({}, state, {
              isLoading: true
          });
      }
      case types.USERS_PROJECT_GET_LOADED:{
        return Object.assign({},state,{
          users:{
            simples:action['users'].simples,
            owners:action['users'].owners
          }
        });
      }
        default: return state;
    }
}
