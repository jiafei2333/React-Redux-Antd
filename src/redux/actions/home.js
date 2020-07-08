import {call, put} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as homeServer from '../actionServer/home';
import {LOGIN_ADD, SetParams} from '../action-types';
import {setToken} from 'Util/commonFun';


// 登录
export function LoginPost(data){
    return async function(dispatch, getState){
        let all = await homeServer.getLoginAdd(data);
        if(all.Code === 0){ // 登录成功跳转到首页
            // 存储token
            setToken(all.Data.Token);
            dispatch(push("/"));
        }
    }
}
// 获取站点基础配置项
export function getSiteConfig(){
    return async function(dispatch, getState){
        let all = await homeServer.getProjectSettings();
        if(all.Code === 0){ // 存储配置数据
            dispatch({type: SetParams, payload:{paramsName: 'siteConfig', paramsValue: all.Data}});
        }
    }
}
// 站点配置主题色获取
export function getThemeConfig(){
    return async function(dispatch, getState){
        let all = await homeServer.getThemeConfigJson();
        if(all.Code === 0){ // 存储配置数据
            dispatch({type: SetParams, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
        }
    }
}

