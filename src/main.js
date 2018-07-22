import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import storeFactory from './redux/storeFactory';

import App from './App';

const store = storeFactory(window.__PRELOADED_STATE__ || {});
const reactMethod = process.env.NODE_ENV === 'development' ? render : hydrate;

reactMethod(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);
