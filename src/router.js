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
        let _obj = routeListen(_store.appReduce, _store.routerReducer);
        _obj && store.dispatch({type: types.SET_PARAMS_ROUTER, payload: _obj, appReduce: _store.appReduce});
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