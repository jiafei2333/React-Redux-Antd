import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import appReduce from './appReducer';
import routerReducer from './routerReducer';
import contentReducer from './contentReducer';
import loadingReducer from './loadingReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    appReduce,
    routerReducer,
    contentReducer,
    loadingReducer
  })
export default createRootReducer;
