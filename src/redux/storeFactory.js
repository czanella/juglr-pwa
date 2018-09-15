import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { simpleAction } from './middlewares';

import reducers from './reducers';

export default (initialState = undefined) => createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, simpleAction)),
);
