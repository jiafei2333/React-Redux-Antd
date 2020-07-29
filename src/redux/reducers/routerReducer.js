import * as types from 'Redux/action-types';
import Loadable from 'react-loadable';
import Loading from 'Components/Base/Loading';
import {dynamicsUrl} from 'Util/commonFun';


const initialState = {
    routeData: [
        {
            path: '/',
            needAuth: true, // true 需要判断是否登录
            component:  Loadable({
                loader: () => import('Pages/Home/Home'),
                loading: Loading,
            })
        },
        {
            path: '/login',
            needAuth: false,
            component: Loadable({
                loader: () => import('Pages/Home/LoginIndex'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/auditing/auditLevel',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Auditing/AuditLevel'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/auditing/auditPending',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Auditing/AuditPending'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/edit/tobeEditedManuscript',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Edit/TobeEditedManuscript'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/gathering/annulsManuscript',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Gathering/AnnulsManuscript'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/gathering/InstitutionalRepository',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Gathering/InstitutionalRepository'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/gathering/manuFeedboxPublic',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Gathering/ManuscriptFeedboxPublic'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/gathering/manuscriptsubmitted',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/Gathering/ManuscriptSubmitted'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/issue/allManuscript',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/issue/AllManuscript'),
                loading: Loading,
            })
        },
        {
            path: '/editorialCenter/issue/tobeIssuedManuscript',
            needAuth: true,
            component: Loadable({
                loader: () => import('Pages/EditorialCenter/issue/TobeIssuedManuscript'),
                loading: Loading,
            })
        }
    ],
    sliderData: []
};

export default function(state=initialState, action){
    const {type, payload, mainMenu} = action;
    switch(type){
        case types.SET_PARAMS_ROUTER:
            // 添加路由
            let _tempData = state.routeData;
            let _index = state.routeData.findIndex(item=>item.path === payload.path);            
            if(_index === -1){ // 添加
                let _component = state.routeData.find(item=>item.path === payload.pathTemp);
                if(_component){
                    let _obj = {
                        path: payload.path,
                        needAuth: true,
                        component: _component.component
                    }
                    _tempData = _tempData.concat(_obj);
                }
                
            }
            // 二级顶部菜单 curSliderKey 二级 thirdSliderKey 三级
            let tempSlider = dynamicsUrl(payload.path.substring(1), "", "", mainMenu);
            return {
                ...state,
                routeData: _tempData,
                sliderData: tempSlider
            }
            break;
        case types.SET_PARAMS_DATA:
            return {
                ...state,
                [`${payload['paramsName']}`]: payload.paramsValue
            }
            break
        default:
            return state;
    }
}