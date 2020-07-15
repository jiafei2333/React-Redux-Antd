import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducers from 'Redux/reducers/reducer';
import rootSagas from 'Redux/sagas/rootSaga';

// 创建一个saga中间件
const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory();

const initialState = {};




const store = createStore(
    rootReducers(history),
    initialState, 
    compose(
        applyMiddleware(
            routerMiddleware(history), 
            logger,
            sagaMiddleware // 将sagaMiddleware 中间件传入到 applyMiddleware 函数中
        )
    )
);

// 动态执行saga，注意：run函数只能在store创建好之后调用
sagaMiddleware.run(rootSagas)

export default store;



