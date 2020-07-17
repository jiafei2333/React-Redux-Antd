import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import appReduce from './appReducer';
import routerReducer from './routerReducer';

// const createRootReducer = history => {
//     return combineReducers({
//         router: connectRouter(history),
//         appReduce
//     })
// }

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    appReduce,
    routerReducer
  })
export default createRootReducer;
