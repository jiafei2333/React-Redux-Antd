import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxSaga from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducers from '../reducers/reducer';

export const history = createBrowserHistory();

const initialState = {};

const store = createStore(
    rootReducers(history),
    initialState, 
    compose(
        applyMiddleware(
            routerMiddleware(history), 
            thunk, 
            logger
        )
    ));
export default store;



