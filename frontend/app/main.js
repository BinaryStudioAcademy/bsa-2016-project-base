/* general */
import 'babel-polyfill';
import React from 'react';
import thunk from "redux-thunk";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr, {toastr} from 'react-redux-toastr';
import { IndexRoute, Route, Router, browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';

/* components */
import App from './App.js';
import Home from '../components/home/Home';
import Stats from '../components/stats/Stats';
import Review from '../components/review/Review';
import NotFound from '../components/not-found/NotFound';
import {Admin, Rights, Tags, Tech} from '../components/admin/';
import ProjectView from '../components/projectview/project-view';
import UpsertProject from '../components/admin/project/UpsertProject';
import EditProject from '../components/admin/edit-project/EditProject';
import ProjectSummary from '../components/project-summary/ProjectSummary';
import TechDetail from '../components/admin/technologies/detail/TechDetail';

import * as reducers from '../reducers/';

const rootReducer = combineReducers({
    ...reducers
});

const errorHandler = store => next => action => {
    if(action.type === 'SOMETHING_GONE_WRONG')
        toastr.error('' + action.error + '');
    return next(action);
};

const store = createStore(
    rootReducer,{},
    compose(applyMiddleware(thunk,errorHandler),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
);

const history = useRouterHistory(createHistory)({
    basename: '/projects'
});

render(
    (<Provider store={store}>
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home} title='projects'/>
                <Route path="project-view/:id" component={ProjectView} title='project summary'/>
                <Route path="project-summary/:id" component={ProjectSummary}/>
                <Route path="add-project" component={UpsertProject} title='add project'/>
                <Route path="edit-project/:id" component={EditProject} title='edit project'/>
                <Route path="review" component={Review} title='review'/>
                <Route path="stats" component={Stats} title='statistics'/>
                <Route path="admin" component={Admin} title='admin menu'>
                    <IndexRoute component={Rights}/>
                    <Route path="rights" component={Rights} />
                    <Route path="tags" component={Tags} />
                    <Route path="tech" component={Tech} />
                    <Route path="tech/:id" component={TechDetail}/>
                </Route>
            </Route>    
        </Router>
    </Provider>),
    document.getElementById('root')
);

// <Route path="stats" component={Stats} title='statistics'/>

