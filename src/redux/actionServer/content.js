import {requestGet, requestPost} from 'Util/request';
import {E} from 'Config/E';
// 获取列表 待审稿件
export async function getEditorialCenterListJson(params) {
    let result = await requestGet(`${E.SERVER_HOME}Article/GetMyReview`, params)
    return result
}
// 获取列表 本级审核
export async function getEditorialCenterListReviewJson(params) {
    let result = await requestGet(`${E.SERVER_HOME}Article/GetReviewArticles`, params)
    return result
}
// 获取审核状态
export async function getArticleGetReviewStatusJson(params) {
    let result = await requestGet(`${E.SERVER_HOME}Article/GetReviewStatus`, params)
    return result
}
// 获取载体
export async function getProjectAppJson(params) {
    let result = await requestGet(`${E.SERVER_HOME}Apps/GetProjectApp`, params)
    return result
}
//待签稿库
export async function getArticleGetWaitingPublishJson(params){
    let result  = await requestPost(E.SERVER_HOME+'Article/GetWaitingPublishs',params)
    return result
}