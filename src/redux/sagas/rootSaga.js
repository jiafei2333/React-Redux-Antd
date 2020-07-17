import {take,fork,put,call,select} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import * as types from '../action-types';
import * as homeServer from '../actionServer/home';
import {setToken, routeListen} from 'Util/commonFun';
import {SET_PARAMS, SET_PARAMS_ROUTER } from '../action-types';

// 登录
function * watchPostLoginIn(){
    while(true){
        const action = yield take(types.POST_LOGIN_IN);
        const all = yield call(homeServer.getLoginAdd, action.payload);
        if(all.Code === 0){ // 登录成功跳转到首页
            // 存储token
            setToken(all.Data.Token);
            // 跳转到首页
            yield put(push('/'));
            // 获取菜单权限
            yield call(GetAccountRights); // fork无阻塞调用 如果这里用call 的话，call 是一个会阻塞的 Effect，即在watchPostLoginIn在watchGetAccountRights中被阻塞了。
        }
    }
}

// 获取站点基础配置项
function * watchGetSiteConfig(){
    while(true){
        yield take(types.GET_SITE_CONFIG);
        yield call(GetSiteConfig);
    }
}
function * GetSiteConfig(){
    const all = yield call(homeServer.getProjectSettings);
    if(all.Code === 0){ // 存储配置数据
        yield put({type: SET_PARAMS, payload:{paramsName: 'siteConfig', paramsValue: all.Data}});
    }
}
// 站点配置主题色获取
function * watchGetThemeConfig(){
    while(true){
        yield take(types.GET_THEME_CONFIG);
        yield call(GetThemeConfig);
    }
}
function * GetThemeConfig(){
    const all = yield call(homeServer.getThemeConfigJson);
    if(all.Code === 0){ // 存储配置数据
        yield put({type: SET_PARAMS, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
    }
}
// 获取菜单权限
function * GetAccountRights(){
    const all = yield call(homeServer.getAccountRightsJson);
    if(all.Code === 0){
        yield put({type:types.SET_PARAMS, payload: {paramsName: 'mainMenu', paramsValue: all.Data}});
        // 如果不是/首页，则更新路由
        let store = yield select();
        let _obj = routeListen(store.appReduce, store.routerReducer);
        if(_obj !== false){
            yield put({type: types.SET_PARAMS_ROUTER, payload: _obj});
        }
    }
} 
// 页面刷新基础配置
function * watchBaseFetch(){
    let pathname = window.location.pathname;
    console.log("pathname:------",pathname);
    if(pathname !== '/login'){
        yield fork(GetAccountRights);
        yield fork(GetSiteConfig);
        yield fork(GetThemeConfig);
    }
}
export default function* rootSaga() {
    console.log("Saga中页面刷新----------------")
    //yield fork(watchGetAccountRights); // watchGetAccountRights 里没有用take来监听某个类型，所以页面完全熟悉你的时候可以自动调用 从而获取菜单栏
    yield fork(watchBaseFetch);
    // 下面这些里面都加了take 等待action被调用 
    yield fork(watchPostLoginIn);
    yield fork(watchGetSiteConfig);
    yield fork(watchGetThemeConfig);
}