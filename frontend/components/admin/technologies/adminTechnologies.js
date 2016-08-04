/**
 * Created by razor on 04.08.16.
 */
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Technologies from './Technologies'
import reducer from '../../../reducers/admin/TechnologiesReducer'

const middleware = process.env.NODE_ENV === 'production' ?
    [thunk] :
    [thunk, logger()];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

render(
    (<Provider store={store}>
            <Technologies/>
        </Provider>
    )
);
