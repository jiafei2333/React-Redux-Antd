import {take,all,fork,put,call,takeEvery} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import * as types from '../action-types';
import * as homeServer from '../actionServer/home';
import {setToken} from 'Util/commonFun';
import {SET_PARAMS } from '../action-types';

// 登录
function * watchPostLoginIn(){
    while(true){
        const action = yield take(types.POST_LOGIN_IN);
        const all = yield call(homeServer.getLoginAdd, action.payload);
        if(all.Code === 0){ // 登录成功跳转到首页
            // 存储token
            setToken(all.Data.Token);
            //dispatch(push("/"));
            yield put(push('/'));
        }
    }
}
// 获取站点基础配置项
function * watchGetSiteConfig(){
    while(true){
        yield take(types.GET_SITE_CONFIG);
        const all = yield call(homeServer.getProjectSettings);
        if(all.Code === 0){ // 存储配置数据
            yield put({type: SET_PARAMS, payload:{paramsName: 'siteConfig', paramsValue: all.Data}});
        }
    }
}
// 站点配置主题色获取
function * watchGetThemeConfig(){
    while(true){
        yield take(types.GET_THEME_CONFIG);
        const all = yield call(homeServer.getThemeConfigJson);
        if(all.Code === 0){ // 存储配置数据
            yield put({type: SET_PARAMS, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
        }
    }
}
// 获取菜单权限
function * watchGetAccountRights(){
    while(true){
        yield take(types.GET_MENU);
        const all = yield call(homeServer.getAccountRightsJson);
        if(all.Code === 0){
            yield put({type:types.SET_PARAMS, payload: {paramsName: 'mainMenu', paramsValue: all.Data}});
        }
    }
} 
// function * watchRouter(){
//     while(true){
//         yield take('@@router/LOCATION_CHANGE');
//         console.log("路由change saga");
//         return true;
//     }
// } 
export default function* rootSaga() {
    // console.log("路由监控-----------------------");
    yield fork(watchGetAccountRights);
    yield fork(watchPostLoginIn);
    yield fork(watchGetSiteConfig);
    yield fork(watchGetThemeConfig);
    // yield fork(watchRouter);
}