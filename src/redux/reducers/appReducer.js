import * as types from 'Redux/action-types';

const initialState = {
    siteConfig: {}, // 站点配置
    colorTheme: '#1890ff', // 主题色
    mainMenu: [], // 目录结构
}


export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case types.SET_PARAMS:
            return {
                ...state,
                [`${payload['paramsName']}`]: payload.paramsValue
            }
            break;
        // case '@@router/LOCATION_CHANGE':
        //     console.log("路由监听 change----------------------------------")
        //     // return {
        //     //     ...state
        //     // }
        //     return state;
        //     break;
        default:
            return state;
    }
}