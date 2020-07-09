// import {call, put} from 'redux-saga/effects';
// import { push } from 'connected-react-router';
// import * as homeServer from '../actionServer/home';
// import {SET_PARAMS} from '../action-types';
// import {setToken} from 'Util/commonFun';


// // // 登录
// // function LoginPost(data){
// //     return async function(dispatch, getState){
// //         let all = await homeServer.getLoginAdd(data);
// //         if(all.Code === 0){ // 登录成功跳转到首页
// //             // 存储token
// //             setToken(all.Data.Token);
// //             dispatch(push("/"));
// //         }
// //     }
// // }
// // // 获取站点基础配置项
// // function getSiteConfig(){
// //     return async function(dispatch, getState){
// //         let all = await homeServer.getProjectSettings();
// //         if(all.Code === 0){ // 存储配置数据
// //             dispatch({type: SET_PARAMS, payload:{paramsName: 'siteConfig', paramsValue: all.Data}});
// //         }
// //     }
// // }
// // // 站点配置主题色获取
// // function getThemeConfig(){
// //     return async function(dispatch, getState){
// //         let all = await homeServer.getThemeConfigJson();
// //         if(all.Code === 0){ // 存储配置数据
// //             dispatch({type: SET_PARAMS, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
// //         }
// //     }
// // }
// // 获取目录权限
// // function getAccountRights(){
// //     return async function(dispatch, getState){
// //         let all = await homeServer.getAccountRightsJson();
// //         if(all.Code === 0){
// //             console.log("权限：", all.Data);
// //             //dispatch({type: SetParams, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
// //         }
// //     }
// // }
// function * getAccountRights(){
//     let all = yield call(homeServer.getAccountRightsJson);
//     console.log("saga all:", all);
//     // return async function(dispatch, getState){
//     //     let all = await homeServer.getAccountRightsJson();
//     //     if(all.Code === 0){
//     //         console.log("权限：", all.Data);
//     //         //dispatch({type: SetParams, payload:{paramsName: 'colorTheme', paramsValue: all.Data.ConfigValue}});
//     //     }
//     // }
// }
// export {
//     LoginPost,
//     getSiteConfig,
//     getThemeConfig,
//     getAccountRights
// }
