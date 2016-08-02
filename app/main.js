import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import App from './app.js'
import Completed from '../components/completed.js'
import Single from '../components/single.js'
import Update from '../components/update.js'
import Admin from '../components/admin.js'
import Chart from '../components/chart.js'

render(
    (<Router history={browserHistory}>
            <Route path="/" component={App} >
                <Route path="completed" component={Completed} /> /* List of completed projects */
                <Route path="single" component={Single} /> /* Single opened project  */
                <Route path="update" component={Update} /> /* Create (update project) */
                <Route path="admin" component={Admin} /> /*	Administration */
                <Route path="chart" component={Chart} /> /*	Charts view */
            </Route>
        </Router>)
    , document.getElementById('root')
)