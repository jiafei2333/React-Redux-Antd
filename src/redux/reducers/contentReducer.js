import * as types from 'Redux/action-types';

const initialState = {
    AuditPendingList: {}, // 待审稿件
    AuditLevelList: {}, // 本级审核
}


export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case types.SET_PARAMS_CONTENT:
            return {
                ...state,
                [`${payload['paramsName']}`]: payload.paramsValue
            }
            break;
        default:
            return state;
    }
}