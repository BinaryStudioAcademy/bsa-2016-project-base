import * as types from '../constants/AdminUserActionTypes';

const initialState = {
currentPojectId:null,// то что пришло при клике на комбобоксик
projectsList:[], // c ним ты работаешь сча
currentUsers, // то что пришло при выборе юзеров текущего проекта
simples:[],
owners:[]

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
      case types.PROJECTS_GET_LOADING: {
          return Object.assign({}, state, {
              isLoading: true
          });
      }
      case types.PROJECTS_GET_LOADED:{
        return Object.assign({},state,{
          projectsList:action.projectsList

        });
      }
        default: return state;
    }
}
