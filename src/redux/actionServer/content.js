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