import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {Link} from 'react-router-dom';
import Home from 'Pages/Home/Home';
import Page404 from 'Pages/404';
import LoginIndex from 'Pages/Home/LoginIndex';
import {getToken} from 'Util/commonFun';

const RouteApp = ({history})=>{
    console.log("RouteApp----")
    const Routes = [
        {
            path: '/',
            needAuth: false,
            component: Home,
        },
        {
            path: '/login',
            needAuth: true,
            component: LoginIndex,
        },
    ]

    let isLoginIn = getToken();
    // 先不做登录判断.............................................................................
    return (
        <ConnectedRouter history={history} >
            <nav>
                <Link to={{pathname:'/', state:{title:'哈哈'}}}>首页</Link>
                <Link to="/login">登录</Link>
            </nav>
            {/* <BrowserRouter> */}
                <Switch>
                    {
                        Routes.map(({path, needAuth, component}, index)=>{
                            if(needAuth === true){
                                
                            }
                            return(
                                <Route key={index} exact path={path} component={component} />
                            )
                        })
                        
                    }
                    <Route render={Page404} />
                </Switch>
            {/* </BrowserRouter> */}
        </ConnectedRouter>
        
    )
};

export default RouteApp;
