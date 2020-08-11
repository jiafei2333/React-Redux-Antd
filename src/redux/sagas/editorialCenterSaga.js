import {take,fork,put,call,select} from 'redux-saga/effects';
import {SET_PARAMS_CONTENT, GET_PROJECT_APP_REQUEST, GET_WAITING_PUBLISH_REQUEST} from '../action-types';
import * as contentServer  from '../actionServer/content';
//  获取采编中心模块-待签稿库-载体
export function * watchGetProjectApp(){
    while(true){
        const action = yield take(GET_PROJECT_APP_REQUEST);
        const all = yield call(contentServer.getProjectAppJson, action.payload);
        if(all.Code === 0){ 
            yield put({type: SET_PARAMS_CONTENT, payload:{paramsName: 'projectApp', paramsValue: all.Data}});
        }
    }
}
// 获取采编中心模块-待签稿库-列表
export function * watchGetWaitingPublishs(){
    while(true){
        const action = yield take(GET_WAITING_PUBLISH_REQUEST);
        const all = yield call(contentServer.getArticleGetWaitingPublishJson, action.payload);
        if(all.Code === 0){ 
            yield put({type: SET_PARAMS_CONTENT, payload:{paramsName: 'tobeIssuedList', paramsValue: all.Data}});
        }
    }
}