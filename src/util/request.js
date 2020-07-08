import {E} from 'Config/E';
import {message} from 'antd';

const FETCH_TIMEOUT = 180 * 1000;

function logError(response) {
    console.group('请求失败')
    console.error(`code: ${response.status}`,);
    console.error(`url: ${response.url}`,);
    console.error(`errorText: ${response.statusText}`,);
    console.groupEnd('请求失败');
}
function checkStatus(response){
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    logError(response);
    const error = new Error(response.statusText);
    error.code = response.status;
    error.response = response;
    throw error;
}
function parseJSON(response, opt) {
    if (opt.method === 'DELETE' || response.status === 204) {
      return response.text();
    }
    return response.json();
}
function requestGet(url, body) {
    if (body) {
        url += '?'
    }
    for (let key in body) {
        url += `${key}=${body[key]}&`
    }
    return _fetch(url, {method: 'GET'})
}
function requestPost(url, body){
    return _fetch(url, {method: 'POST', body})
}
function _fetch(url, options){
    const defaultOptions = {
        credentials: 'include',
    };
    let newOptions = {...defaultOptions, ...options};
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'PATCH') {
        newOptions.body = JSON.stringify(newOptions.body);
    }
    let request;
    let _timeout = FETCH_TIMEOUT;
    let tokenHeader = {Authorization: `Bearer ${window.localStorage.getItem(`${E.SERVER_TOKEN}token`)}`};
    newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
        ...tokenHeader
    }
    if(_timeout === -1){
        request = Promise.race([
            fetch(url, newOptions)
        ])
    }else{
        request = Promise.race([
            fetch(url, newOptions),
            new Promise((resolve, reject)=>{
                setTimeout(()=>reject({success: false, message: 'request timeout', code: 408}), _timeout);
            })
        ])
    }
    return request
    .then(checkStatus)
    .then(res=>parseJSON(res, newOptions))
    .then(res=>{
        if(res.Code !== 0){
            message.error(res.Message)
            throw res.Message;
        }
        return res;
    })
    .catch(e=>{
        return Promise.reject({success: false, response: e, code: e.code})
    })
    
}
export {
    requestGet,
    requestPost
}