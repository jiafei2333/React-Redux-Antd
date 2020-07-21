import * as types from 'Redux/action-types';
import Home from 'Pages/Home/Home';
import LoginIndex from 'Pages/Home/LoginIndex';
import {AuditLevel, AuditPending, TobeEditedManuscript, AnnulsManuscript, InstitutionalRepository, ManuscriptFeedboxPublic, ManuscriptSubmitted,AllManuscript,TobeIssuedManuscript} from 'Pages/EditorialCenter/index';
import {dynamicsUrl} from 'Util/commonFun';

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
            path: '/editorialCenter/auditing/auditLevel',
            needAuth: true,
            component: AuditLevel
        },
        {
            path: '/editorialCenter/auditing/auditPending',
            needAuth: true,
            component: AuditPending
        },
        {
            path: '/editorialCenter/edit/tobeEditedManuscript',
            needAuth: true,
            component: TobeEditedManuscript
        },
        {
            path: '/editorialCenter/gathering/annulsManuscript',
            needAuth: true,
            component: AnnulsManuscript
        },
        {
            path: '/editorialCenter/gathering/InstitutionalRepository',
            needAuth: true,
            component: InstitutionalRepository
        },
        {
            path: '/editorialCenter/gathering/manuFeedboxPublic',
            needAuth: true,
            component: ManuscriptFeedboxPublic
        },
        {
            path: '/editorialCenter/gathering/manuscriptsubmitted',
            needAuth: true,
            component: ManuscriptSubmitted
        },
        {
            path: '/editorialCenter/issue/allManuscript',
            needAuth: true,
            component: AllManuscript
        },
        {
            path: '/editorialCenter/issue/tobeIssuedManuscript',
            needAuth: true,
            component: TobeIssuedManuscript
        }
    ],
    sliderData: []
};

export default function(state=initialState, action){
    const {type, payload, appReduce} = action;
    switch(type){
        case types.SET_PARAMS_ROUTER:
            // 添加路由
            let _tempData = state.routeData;
            let _index = state.routeData.findIndex(item=>item.path === payload.path);            
            if(_index === -1){ // 添加
                let _component = state.routeData.find(item=>item.path === payload.pathTemp);
                console.log("line77-------------", _component);
                let _obj = {
                    path: payload.path,
                    needAuth: true,
                    component: _component.component
                }
                _tempData = _tempData.concat(_obj);
            }
            // 二级顶部菜单 curSliderKey 二级 thirdSliderKey 三级
            let tempSlider = dynamicsUrl(payload.path.substring(1), "", "", appReduce.mainMenu);
            console.log("tempSlider-------------------------:",tempSlider);
            return {
                ...state,
                routeData: _tempData,
                sliderData: tempSlider
            }
            break;
        default:
            return state;
    }
}