import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {E} from 'Config/E';


export const PrivateRoute = ({path, component: Com, history}) => {
    let isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    // console.log("PrivateRoute history:",history);
    // console.log("PrivateRoute store:",store);
    // console.log("path:",path);
    if(!isLoginIn){ // 没有登录 重定向到登录页面
        // console.log("isLoginIn1:",isLoginIn);
        return (
            <Redirect to="/login" />
        )
    }
    
    // console.log("isLoginIn2:",isLoginIn);
    return (
        <Route exact path={path} render={()=>{
            return <Com />
        }} />
    )
    
}


export default PrivateRoute;
