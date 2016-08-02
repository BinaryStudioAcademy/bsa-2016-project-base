import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import App from './app.js'
import Chart from '../components/chart.js'


import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from '../components/reducers/reducer.js'

const store = createStore(reducer)

render(
    (<Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="chart" component={Chart} /> /*	Charts view */
            </Route>
        </Router>
    </Provider>)
    , document.getElementById('root')
)