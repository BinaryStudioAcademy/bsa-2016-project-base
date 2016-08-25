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
import Test from '../components/common/test.js';
import * as reducers from '../reducers/';
import ReduxToastr, {toastr} from 'react-redux-toastr'
const rootReducer = combineReducers({
    ...reducers
});
const errorHandler = store => next => action => {
    if(action.type === 'SOMETHING_GONE_WRONG'){
        toastr.error(''+action.error+'');
    }
    let result = next(action);
    return result;
};


const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f)
);
render(
    (<Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home} title='projects'/>
            <Route path="projects" component={ProjectsList} title='projects'/>
            <Route path="project-view/:id" component={ProjectView} title='project summary'/>
            <Route path="test" component={Test} />
            <Route path="project-summary/:id" component={ProjectSummary}/>
            <Route path="add-project" component={UpsertProject} title='add project'/>
            <Route path="admin" component={Admin} title='admin menu'>
              <Route path="rights" component={Rights} />
              <Route path="tags" component={Tags} />
              <Route path="tech" component={Tech} />
              <Route path="tech/:id" component={TechDetail}/>
            </Route>
            <Route path="stats" component={Stats} title='stats'/>
            <Route path="review" component={Review} title='review'/>
            <Route path="*" component={NotFound} title='not found'/>
          </Route>
        </Router>
      </Provider>)
, document.getElementById('root')
);
