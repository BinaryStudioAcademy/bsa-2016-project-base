import { combineReducers } from 'redux';
import users from './users_reducer';


const rootReducer = combineReducers({
    users: users
});

export default rootReducer;