import * as types from '../action-types';

const initialState = {
    siteConfig: {}, // 站点配置
    colorTheme: '#1890ff', // 主题色
    mainMenu: [], // 目录结构
}


export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case types.SetParams:
            return {
                ...state,
                [`${payload['paramsName']}`]: payload.paramsValue
            }
        default:
            return state;
    }
}