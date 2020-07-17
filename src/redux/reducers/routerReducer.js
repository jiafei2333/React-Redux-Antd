import * as types from 'Redux/action-types';
import Home from 'Pages/Home/Home';
import LoginIndex from 'Pages/Home/LoginIndex';
import AuditLevel from 'Pages/EditorialCenter/Auditing/AuditLevel';

const initialState = {
    routeData: [
        {
            path: '/',
            needAuth: true, // true 需要判断是否登录
            component: Home,
        },
        {
            path: '/login',
            needAuth: false,
            component: LoginIndex,
        },
        {
            path: '/editorialCenter/gathering/manuFeedboxPublic',
            needAuth: true,
            component: AuditLevel
        }
    ]
};

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case types.SET_PARAMS_ROUTER:
            debugger;
            let _tempData = state.routeData;
            let _index = state.routeData.findIndex(item=>item.path === payload.path);            
            if(_index === -1){ // 添加
                let _component = state.routeData.find(item=>item.path === payload.pathTemp);
                let _obj = {
                    path: payload.path,
                    needAuth: true,
                    component: _component.component
                }
                _tempData = _tempData.concat(_obj);
            }
            return {
                ...state,
                routeData: _tempData
            }
            break;
        default:
            return state;
    }
}