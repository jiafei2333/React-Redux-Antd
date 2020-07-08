import {requestGet, requestPost} from 'Util/request';
import {E} from 'Config/E';
// 登录
export async function getLoginAdd(params){
    let result = await requestPost(`${E.SERVER_HOME}Token/Login`,params);
    return result;
}
// 获取站点基础配置项
export async function getProjectSettings(params) {
    let result = await requestGet(`${E.SERVER_HOME}Configs/GetProjectSettings`)
    return result
}
// 站点配置主题色获取
export async function getThemeConfigJson(params) {
    let result = await requestGet(`${E.SERVER_HOME}Configs/GetThemeConfig`,params)
    return result
}