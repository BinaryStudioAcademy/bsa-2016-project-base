import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import App from './App.js';
import {Admin, Rights, Tags, Tech} from '../components/admin/';
import UpsertProject from '../components/admin/project/UpsertProject';
import TechDetail from '../components/admin/technologies/detail/TechDetail';
import ProjectsList from '../components/projects/ProjectsList';
import ProjectView from '../components/projectview/project-view';
import ProjectSummary from '../components/project-summary/ProjectSummary';
import Home from '../components/home/Home';
import Stats from '../components/stats/Stats';
import Review from '../components/review/Review';
import NotFound from '../components/not-found/NotFound';
import * as reducers from '../reducers/';
import ReduxToastr, {toastr} from 'react-redux-toastr'
const rootReducer = combineReducers({
    ...reducers
});
const tokenRefresher = store => next => action => {
    if(action.type === 'SOMETHING_GONE_WRONG'){
        toastr.error(''+action.error+'');
    }
    let result = next(action);
    return result;
};


const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(thunk,tokenRefresher), window.devToolsExtension ? window.devToolsExtension() : f => f)
);
render(
    (<Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="projects" component={ProjectsList}/>
            <Route path="project-view/:id" component={ProjectView} />
            <Route path="project-summary/:id" component={ProjectSummary}/>
            <Route path="add-project" component={UpsertProject}/>
            <Route path="admin" component={Admin} >
              <Route path="rights" component={Rights} />
              <Route path="tags" component={Tags} />
              <Route path="tech" component={Tech} />
              <Route path="tech/:id" component={TechDetail}/>
            </Route>
            <Route path="stats" component={Stats} /> 
            <Route path="review" component={Review} /> 
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>) 
, document.getElementById('root')
);
