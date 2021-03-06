import { hot } from 'react-hot-loader/root';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as types from 'Redux/action-types';
import {routeListen} from 'Util/commonFun';
import Page404 from 'Pages/404';
import PrivateRoute from 'Components/Base/PrivateRoute';
import MainLayout from 'Components/Base/MainLayout';


class RouteApp  extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const {routeData} = this.props;
        
        console.log("路由页面是否刷新：", routeData, window.location)
        return (
            <>
            <Switch>
                {
                    routeData.map(({path, needAuth, component}, index)=>{
                        // if(needAuth === true){ // 需要做登录判断
                        //     return <PrivateRoute key={index}  path={path} component={component} />
                        // }else{
                            return <Route key={index} exact path={path} component={component} />
                        // }
                    })
                }
               {/* <Redirect to="/"></Redirect> */}
            </Switch>
            
            </> 
        )
    }
    
};
const mapStateToProps = (state) => ({
    routeData: state.routerReducer.routeData
})
const mapDispatchToProps = dispatch =>{
    return { 
    }
}
RouteApp =  connect(mapStateToProps, mapDispatchToProps)(RouteApp)




const App = ({history, store}) =>{
    console.log("App----------------------------完全刷新");
    // 监听路由
    history.listen((location, action) => {
        console.log("路由监听~~~~~~~~~~~~", location);
        let _store = store.getState();
        let _obj = routeListen(_store.appReduce.mainMenu, _store.routerReducer);
        _obj && store.dispatch({type: types.SET_PARAMS_ROUTER, payload: _obj, mainMenu: _store.appReduce.mainMenu});

        // 更新 采编审发模块 左侧二级菜单
        let urlSplit = history.location.pathname.split("/");
        if(urlSplit[1] === 'editorialCenter' && urlSplit.length === 4 ){ 
            let oldUrl = _store.routerReducer.sliderData.thirdMenu.split("/");
            // console.log("Old:---",oldUrl,"New:---", urlSplit, "history:---", history);
            if(oldUrl.length === 4 && `/${oldUrl[1]}/${oldUrl[2]}` !== `/${urlSplit[1]}/${urlSplit[2]}`){
                store.dispatch({type: types.SET_PARAMS_OBJECT, payload: {paramsNameObj: 'sliderData', paramsName: 'thirdMenu', paramsValue: location.pathname}});
            } 
        }
        
    })
    return (
        <ConnectedRouter history={history} >
            <ConfigProvider locale={zhCN}>
                <MainLayout history={history}>
                    <RouteApp />
                </MainLayout>
            </ConfigProvider>
        </ConnectedRouter>
    )
}
export default hot(App);