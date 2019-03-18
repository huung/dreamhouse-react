import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {history} from './helper/history'
import store from './redux/store'
import App from './App';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
