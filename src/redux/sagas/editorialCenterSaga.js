import {take,fork,put,call,select} from 'redux-saga/effects';
import {SET_PARAMS_CONTENT, GET_AUDITPENDING_DATA, GET_AUDITLEVEL_DATA} from '../action-types';
import * as contentServer  from '../actionServer/content';
//  获取采编中心模块-列表 待审稿件
export function * watchGetEditorialCenterList(){
    while(true){
        const action = yield take(GET_AUDITPENDING_DATA);
        const all = yield call(contentServer.getEditorialCenterListJson, action.payload);
        if(all.Code === 0){ 
            yield put({type: SET_PARAMS_CONTENT, payload:{paramsName: 'AuditPendingList', paramsValue: all.Data}});
        }
    }
}
//  获取采编中心模块-列表 本级审核
export function * watchGetEditorialCenterListReview(){
    while(true){
        const action = yield take(GET_AUDITLEVEL_DATA);
        const all = yield call(contentServer.getEditorialCenterListReviewJson, action.payload);
        if(all.Code === 0){ 
            yield put({type: SET_PARAMS_CONTENT, payload:{paramsName: 'AuditLevelList', paramsValue: all.Data}});
        }
    }
}