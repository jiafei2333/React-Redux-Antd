import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Home from 'Pages/Home/Home';
import Page404 from 'Pages/404';
import LoginIndex from 'Pages/Home/LoginIndex';
import PrivateRoute from 'Components/Base/PrivateRoute';

const RouteApp = ({history})=>{
    console.log("RouteApp----")
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
    ]
    return (
        <ConnectedRouter history={history} >
            {/* <BrowserRouter> */}
                <Switch>
                    {
                        Routes.map(({path, needAuth, component}, index)=>{
                            if(needAuth === true){ // 需要做登录判断
                                return <PrivateRoute key={index} exact path={path} component={component} history={history} />
                                
                            }else{
                                return <Route key={index} exact path={path} component={component} />
                            }
                            
                        })
                        
                    }
                    <Redirect to="/" render={Page404} />
                </Switch>
            {/* </BrowserRouter> */}
        </ConnectedRouter>
        
    )
};

export default RouteApp;
