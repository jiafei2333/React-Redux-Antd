import {E} from 'Config/E';
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
