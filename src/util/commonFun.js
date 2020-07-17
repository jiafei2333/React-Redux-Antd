import {E} from 'Config/E';
import get from 'lodash/get';
// 登录名
export const loginNameReg = (rule, value, callback) => {
    if((/^[a-zA-Z][a-zA-Z0-9_]{3,20}$/.test(value)) || (/^1[34578]\d{9}$/.test(value))){
      callback();
    }else{
      callback("请输入4-20位用户名,仅包含字母、数字及下划线");
    }
}
// 登录密码
export const passWordReg = (rule,value,callback) => {
    if( value && value.length < 6  || value.length > 30){
      callback("请输入6-30位密码");
    }
    callback();
}
// 存储token
export const setToken = (value) =>{
  window.localStorage.setItem(`${E.SERVER_TOKEN}token`, value);
}
// 取token
export const getToken = ()=>{
  return window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
}
// 根据一级目录推导出当前一级目录下三级目录路径
export const routeListen = (appReduce, routerReducer) =>{
  let currUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  let _split = currUrl.split("/");
  if(_split.length !== 2 || !_split[1] ) return  false;
  let _index = appReduce.mainMenu.findIndex(item=>item.ModeUrl === currUrl);
  let _index2 = routerReducer.routeData.findIndex(item=>item.path === currUrl);
  let tempUrl;
  if(_index > -1 && _index2 === -1){
      tempUrl = get(appReduce.mainMenu[_index], "ChildList.0.ChildList.0.ModeUrl");
      let _obj = {
          path: '/editorialCenter',
          pathTemp: tempUrl
      }
     return _obj;
  }
}