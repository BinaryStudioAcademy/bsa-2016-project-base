import React, { Component } from 'react';
import UserList from './users_list';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root_reducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);
export default class User extends Component {
    render() {
        return (
            <Provider store={ store }>
                <UserList />
            </Provider>
        );
    }
}