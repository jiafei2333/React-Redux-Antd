import {E} from 'Config/E';
import {message, notification} from 'antd';

// 请求超时时间
const FETCH_TIMEOUT = 180 * 1000;
const codeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得。',
    408: '请求超时。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
  };
function notificationError(response) {
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 请稍后再试`,
      description: errorText,
    });
  }
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
    notificationError(response);
    logError(response);
    const error = new Error(response.statusText);
    error.code = response.status;
    error.response = response;
    error.obj = response.json();
    window.location.href='/login';
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
        // console.log("request res:",res);
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