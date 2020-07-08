import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import appReduce from './appReduce';

// const createRootReducer = history => {
//     return combineReducers({
//         router: connectRouter(history),
//         appReduce
//     })
// }

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    appReduce
  })
export default createRootReducer;
