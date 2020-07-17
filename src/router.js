import { hot } from 'react-hot-loader/root';
import React, {useState} from 'react';
import {Route, Switch, Redirect, Link } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import get from 'lodash/get';
import Home from 'Pages/Home/Home';
import Page404 from 'Pages/404';
import LoginIndex from 'Pages/Home/LoginIndex';
import PrivateRoute from 'Components/Base/PrivateRoute';
import MainLayout from 'Components/Base/MainLayout';
import AuditLevel from 'Pages/EditorialCenter/Auditing/AuditLevel';

const Routes = [
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
        path: '/editorialCenter',
        needAuth: true,
        component: AuditLevel
    },
    {
        path: '/editorialCenter/auditing/auditLevel',
        needAuth: true,
        component: AuditLevel
    }
];
const RouteApp = ({history, store})=>{
    const [RoutesData, setRoutes] = useState(Routes);
    // 监听路由
    // history.listen((location, action) => {
    //     console.log("路由监听~~~~~~~~~~~~");
    //     let currUrl = `${location.pathname}${location.search}${location.hash}`;
    //     let _store = store.getState();
    //     let _index = _store.appReduce.mainMenu.findIndex(item=>item.ModeUrl === currUrl);
    //     let tempUrl;
    //     if(_index > -1){
    //         tempUrl = get(_store.appReduce.mainMenu[_index], "ChildList.0.ChildList.0.ModeUrl");
    //         console.log("三级路径", tempUrl, RoutesData);
    //         let _RoutesData = RoutesData;
    //         _RoutesData.push({
    //             path: '/editorialCenter',
    //             needAuth: true,
    //             component: AuditLevel
    //         })
    //         setRoutes(_RoutesData);
    //         console.log("三级路径2", _RoutesData);
    //     }
    //     console.log("路由监听 router ~~1", RoutesData)
    // })
    console.log("路由页面是否刷新：", RoutesData)
    return (
        <>
        <Switch>
            {
                Routes.map(({path, needAuth, component}, index)=>{
                    if(needAuth === true){ // 需要做登录判断
                        return <PrivateRoute key={index} exact path={path} component={component}  history={history} />
                        
                    }else{
                        return <Route key={index} exact path={path} component={component} />
                    }
                })
            }
           <Redirect to="/"></Redirect>
        </Switch>
        </> 
    )
};

const App = ({history, store}) =>{
    console.log("App----------------------------完全刷新");
    
    return (
        <ConnectedRouter history={history} >
            <MainLayout history={history}>
                <RouteApp history={history} store={store} />
            </MainLayout>
        </ConnectedRouter>
    )
}
export default hot(App);