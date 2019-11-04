import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import schemeReducer from "./reducers/schemeReducer";


const combinedReducers = combineReducers({
    schemeStore: schemeReducer,
});

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducers, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;
