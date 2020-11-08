import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.js';
import reportWebVitals from './common/reportWebVitals.js';
import { Router, Route } from 'react-router';
import {createBrowserHistory} from 'history';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
    </Route>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
