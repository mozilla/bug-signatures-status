import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers.jsx';
import { fetchTotals } from './actions.jsx';

import Layout from './pages/layout.jsx';
import HomePage from './pages/home.jsx';
import BugStatusPage from './pages/bug-status.jsx';


document.addEventListener('DOMContentLoaded', function() {
    const loggerMiddleware = createLogger();

    const createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )(createStore);

    let store = createStoreWithMiddleware(rootReducer);

    store.dispatch(fetchTotals());

    render((
        <Provider store={store}>
            <Router>
                <Route path="/" component={Layout}>
                    <IndexRoute component={HomePage} />
                    <Route path="bug/:id" component={BugStatusPage} />
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('main'));
}, false);
