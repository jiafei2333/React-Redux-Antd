
# 1. 环境搭建

` npx create-react-app myapp`

版本：
```json
"react": "^16.13.1",
"redux": "^4.0.5",
"react-dom": "^16.13.1",
"react-router-dom": "^5.2.0",
"@babel/core": "^7.9.6",
"webpack": "^4.43.0",
```

## 1.1 安装webpack

` npm install --save-dev webpack-cli webpack webpack-merge webpack-dev-server  clean-webpack-plugin `

具体步骤见 https://jiafei2333.github.io/2019/10/12/Webpack-base/

## 1.2 安装loader

` npm install style-loader css-loader --save-dev `
` npm install less less-loader --save-dev `
` npm install file-loader --save-dev `

## 1.3 安装babel

` npm install @babel/core @babel/preset-env babel-loader --save-dev `
` npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators --save-dev `
` npm install core-js@2 --save `
` npm install --save-dev @babel/plugin-transform-runtime `
` npm install --save @babel/runtime `

具体步骤见 https://jiafei2333.github.io/2019/11/13/Webpack-js/

## 1.4 安装开发环境

` npm install --save redux `
` npm install --save react-redux `
` npm install --save redux-saga `
` npm install --save react-router-dom `
`npm install redux-thunk redux-logger --save`


## 1.5 基础目录创建

![](https://jiafei2333.github.io/html/react-redux01.png "")

## 1.6 UI组件库

` npm install antd --save `

## 1.7 错误处理

# 2. 基础功能

## 2.1 将redux与react-router 连接

### 2.1.1 前情

src/redux/actions/home.js
```javascript
import {fetchLoginAdd} from '../actionServer/home';
import {LOGIN_ADD} from '../action-types';
function LoginPost(data){ // redux-thunk
    return async function(dispatch, getState){
        let all = await fetchLoginAdd(data);
        if(all.Code === 0){
            dispatch({type: LOGIN_ADD})
            // 当这里登陆成功需要跳转到首页，直接切换路由时，需要用到dispatch(push('/xxx'));
            // 引入push     import { push } from 'connected-react-router';
        }
    }
}
export {
    LoginPost
}
```

在redux actions中可以用dispatch(push('/xxxx'))切换路由
通过 connected-react-router 和 history 两个库将 react-router 与 redux 进行深度整合实现。

`npm install connect-react-router history --save`

然后给 store 添加如下配置：

- 创建`history`对象，因为我们的应用是浏览器端，所以使用`createBrowserHistory`创建
- 使用connectRouter包裹 root reducer 并且提供我们创建的history对象，获得新的 root reducer
- 使用routerMiddleware(history)实现使用 dispatch history actions，这样就可以使用push('/path/to/somewhere')去改变路由（这里的 push 是来自 connected-react-router 的）

store.js
```javascript
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducers from '../reducers/reducer';

export const history = createBrowserHistory();

const initialState = {};

const store = createStore(
    rootReducers(history),
    initialState, 
    applyMiddleware(thunk, routerMiddleware(history)));
export default store;
```

src/reducers/reducers.js
```javascript
import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import appReduce from './appReduce';

const createRootReducer = history => {
    return combineReducers({
        router: connectRouter(history),
        appReduce
    })
}
export default createRootReducer;
```

根组件中，添加如下配置
- 使用ConnectedRouter包裹路由，并且将 store 中创建的history对象引入，作为 props 传入应用
- ConnectedRouter组件要作为Provider的子组件

index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store,{history} from 'Redux/store/store';
import Router from './router';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
```
这样就将 redux 与 react-router 整合完毕了。


## 2.2 顶部加载动画 NProgress

`npm install --save nprogress`

## 2.3 路由登录判断

src/router.js
```javascript
import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Home from 'Pages/Home/Home';
import Page404 from 'Pages/404';
import LoginIndex from 'Pages/Home/LoginIndex';
import PrivateRoute from 'Components/Base/PrivateRoute';

const RouteApp = ({history})=>{
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
        </ConnectedRouter>
    )
};
export default RouteApp;
```
src/components/Base/PrivateRoute.js
```javascript
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {E} from 'Config/E';

export const PrivateRoute = ({path, component, history}) => {
    let isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    if(!isLoginIn){ // 没有登录 重定向到登录页面
        return (
            <Redirect to="/login" />
        )
    }else{
        return (
            <Route exact path={path} component={component} />
        )
    }
}
export default PrivateRoute;
```

## 2.4 使用redux-saga

关于为什么将redux-thunk换成redux-saga，及redux-saga的知识点查看 #5.1 #5.2

src/redux/sagas/rootSaga.js
```javascript
// 登录
function * watchPostLoginIn(){
    while(true){
        const action = yield take(types.POST_LOGIN_IN);
        // 这里action返回的就是页面上dispatch的内容
        const all = yield call(homeServer.getLoginAdd, action.payload);
        if(all.Code === 0){ // 登录成功跳转到首页
            // 存储token
            setToken(all.Data.Token);
            // 登录成功跳转到首页
            yield put(push('/'));
            // 如果要存储数据 这里走reducers
            yield put({type: SET_PARAMS, payload:{...}});
        }
    }
}
export default function* rootSaga() {
    yield fork(watchPostLoginIn);
}
```

/src/store/store.js
```javascript
import {createStore, applyMiddleware, compose} from 'redux';
+import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducers from 'Redux/reducers/reducer';
+import rootSagas from 'Redux/sagas/rootSaga';

// 创建一个saga中间件
+const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory();

const initialState = {};

const store = createStore(
    rootReducers(history),
    initialState, 
    compose(
        applyMiddleware(
            routerMiddleware(history), 
+            sagaMiddleware, // 将sagaMiddleware 中间件传入到 applyMiddleware 函数中
            logger
        )
    )
);

// 动态执行saga，注意：run函数只能在store创建好之后调用
+sagaMiddleware.run(rootSagas)

export default store;
```

src/pages/Home/LoginIndex.js
```javascript
onSubmit(value){
    this.props.postLoginIn({userName: value.username, password: value.password});
}
...
const mapDispatchToProps = dispatch => {
    return {
        postLoginIn: (data) => dispatch({type: POST_LOGIN_IN,payload:data})
    }
}
```


# 3. 疑问


## 3.1 push跳转

在redux/actions中`dispatch(push("/home"))`做了路由跳转，url地址栏改变了，但是页面没有切换
src/router.js
```javascript
import React from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import Home from './pages/Home/Home';
import LoginIndex from './pages/Home/LoginIndex';

const RouteApp = ({history})=>{
    return (
        <ConnectedRouter history={history} >
            {/* <BrowserRouter> */}
                <Switch>
                    <Route path="/home" exact={true} component={Home} />
                    <Route path="/Login" exact={true} component={LoginIndex} />
                    <Redirect to="/" ></Redirect>
                </Switch>
            {/* </BrowserRouter> */}
        </ConnectedRouter>
        
    )
};
export default RouteApp;
```
现在将line10、line16注释，可以跳转，url和页面都切换。

## 3.2 引入less文件

直接import 引入不了 ？？
`import Style from './style.less';` Style打印出一个空对象 ？？

改成 
`import './style.less';` 直接引入
`className='class的名字'` 

## 3.3 全局下的菜单栏数据

我的想法是没有做数据交互的组件都写成函数组件，所以这里写顶部菜单栏组件一开始写的是函数组件，如下：
```javascript
import React from 'react';
import { Layout, Menu } from 'antd';
import {E} from 'Config/E';

const { Header, Content, Footer } = Layout;

const MainLayout = ({store, history, children}) =>{
    const appReducers = store.getState();
    let isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    return (
        <>
        {
            !isLoginIn ? 
                <>{children}</> 
                :
                <Layout className="layout">
                {
                    appReducers.mainMenu ? 
                    <Header>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header> : ""
                }
                    <Content style={{ padding: '0 50px' }}>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            }
        </>
        
    )
}
export default MainLayout;
```
但是当首页componentDidMount中获取数据，redux reducer数据改变，页面没有更新，所以只能改为Class Component，如下：
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {E} from 'Config/E';

const { Header, Content, Footer } = Layout;

export class MainLayout extends Component {
    constructor(props){
        super(props);
        this.isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    }
    render() {
        const {mainMenu, children} = this.props;
        return (
            <>
            {
                !this.isLoginIn ? 
                    <>{children}</> 
                    :
                    <Layout className="layout">
                    {
                        mainMenu ? 
                        <Header>
                            <div className="logo" />
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                {
                                    mainMenu.map((item)=>{
                                        return (
                                        <Menu.Item key={item.ModeCode}><Link key={item.ModeCode} to={item.ModeUrl}>{item.ModeName}</Link></Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Header> : ""
                    }
                        <Content style={{ padding: '0 50px' }}>
                            {children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    mainMenu: state.appReduce.mainMenu
})

const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
```
当mainMenu数据变化的时候页面菜单自动刷新显示。

<!-- ## 3.4 BrowserRouter 改为 HashRouter

当使用<BrowserRouter>做路由时，首先开启
```json
devServer:{
    historyApiFallback: true,    
},
```
在开发环境下，<Link>可以跳转的路径，刷新页面，当前路径下的页面不会报Not Found。
现在当我要访问 `/editorialCenter/auditing/auditLevel`时，<Link>可以访问，刷新页面报错，如下：

![](https://jiafei2333.github.io/html/images/Error：react-router-BrowserRouter01.png "")
只有`/editorialCenter` 一级时，刷新页面可以访问到，当多级时报错，找了很久都解决不了，所以现在将路由改为了HashRouter...... -->

# 4. 报错

## 4.1 ant 引入.less后缀的样式文件

```javascript
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
```

![](https://jiafei2333.github.io/html/images/redux-project-less01.png "")

将 build/webpack.base.js
```javascript
{
    test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"]
}
```
修改为
```javascript
{
    test: /\.less$/,
    use: ["style-loader", "css-loader", {
        loader: "less-loader",
        options: {
            javascriptEnabled: true
        }
    }]
}
```
报错
![](https://jiafei2333.github.io/html/images/redux-project-less02.png "")

当前版本 `"less-loader": "^6.1.0"`，查了之后都说v6有兼容性问题，所以将版本改为`"less-loader": "5.0.0",`,这样就可以了，没有报错。


# 5. 知识点

## 5.1 redux-thunk

redux-thunk的原理就是判别action的类型，如果action是函数，就调用这个函数。thunk仅仅做了执行这个函数，并不在乎函数主体内是什么，也就是说thunk使得redux可以接受函数作为action，但是函数的内部可以多种多样。比如下面是一个获取商品列表的异步操作所对应的action：
```javascript
export default ()=>(dispatch)=>{
    fetch('/api/goodList',{ //fecth返回的是一个promise
      method: 'get',
      dataType: 'json',
    }).then(function(json){
      var json=JSON.parse(json);
      if(json.msg==200){
        dispatch({type:'init',data:json.data});
      }
    },function(error){
      console.log(error);
    });
};
```

从这个具有副作用的action中，我们可以看出，函数内部极为复杂。如果需要为每一个异步操作都如此定义一个action，显然action不易维护。

action不易维护的原因：
- action的形式不统一
- 就是异步操作太为分散，分散在了各个action中

## 5.2 redux-saga

从 Saga 内触发异步操作（Side Effect）总是由 yield 一些声明式的 Effect 来完成的。

### 5.2.1 call

https://redux-saga-in-chinese.js.org/docs/basics/DeclarativeEffects.html

redux-saga 提供了一个不一样的方式来执行异步调用
```javascript
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
```
call 是一个会阻塞的 Effect。即 Generator 在调用结束之前不能执行或处理任何其他事情。
call 不仅可以用来调用返回 Promise 的函数。我们也可以用它来调用其他 Generator 函数。 
fork表示无阻塞调用。

### 5.2.2 take

```javascript
function* loginFlow() {
  while(true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if(token) {
      yield call(Api.storeItem({token}))
      yield take('LOGOUT')
      yield call(Api.clearItem('token'))
    }
  }
}
```
loginFlow 首先等待一个 LOGIN_REQUEST action。 然后在 action 的 payload 中获取有效凭据（即 user 和 password）并调用一个 call 到 authorize 任务。

### 5.2.3 put

redux-saga做为中间件，工作流是这样的：

<em>UI——&gt;action1————&gt;redux-saga中间件————&gt;action2————&gt;reducer..</em>

从工作流中，我们发现redux-saga执行完副作用函数后，必须发出action，然后这个action被reducer监听，从而达到更新state的目的。相应的这里的put对应与redux中的dispatch，工作流程图如下：

![](https://user-gold-cdn.xitu.io/2018/7/9/1647cf9387036a5b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 "")

从图中可以看出redux-saga执行副作用方法转化action时，put这个Effect方法跟redux原始的dispatch相似，都是可以发出action，且发出的action都会被reducer监听到。

```javascript
 yield put({type:'login'})
```

### 5.2.4 select

put方法与redux中的dispatch相对应，同样的如果我们想在中间件中获取state，那么需要使用select。select方法对应的是redux中的getState，用户获取store中的state，使用方法：
```javascript
const state= yield select()
```

### 5.2.5 fork

fork方法相当于web work，fork方法不会阻塞主线程，在非阻塞调用中十分有用。
当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。

### 5.2.6 takeEvery和takeLatest

takeEvery和takeLatest用于监听相应的动作并执行相应的方法，是构建在take和fork上面的高阶api，比如要监听login动作，takeEvery方法可以：

```javascript
yield takeEvery('login',loginFunc)
```
takeEvery监听到login的动作，就会执行loginFunc方法，除此之外，takeEvery可以同时监听到多个相同的action。在上面的例子中，takeEvery 允许多个 loginFunc 实例同时启动

takeLatest方法跟takeEvery是相同方式调用：

```javascript
takeLatest('login',loginFunc)
```

与takeLatest不同的是，takeLatest是会监听执行最近的那个被触发的action。
在任何时刻 takeLatest 只允许执行一个 loginFunc 任务，并且这个任务是最后被启动的那个，如果之前已经有一个任务在执行，那之前的这个任务会自动被取消。


# 6. 功能模块

新增独立的功能模块

## 6.1 采编中心

src/pages/EditorialCenter










# 7. 相关文章

1. https://juejin.im/post/5b4de4496fb9a04fc226a7af
2. https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
3. https://juejin.im/post/5b440f7ae51d45195759f345


# 8. 未完成功能

- 1.全局loading
- 2.按钮的loading
- 3.nprogress未完
- 4.<s>saga代替thunk</s>（完成）
- 5.配置node后台服务
- 6.antd中局部修改默认样式
- 7.<s>react-hot-loader</s>（完成一半，在saga中修改还是会完全刷新）
    目的是为了解决，页面自动刷新导致react 组件的状态丢失。
- 8.<s>强制刷新时获取基本信息(菜单权限、配置信息等等)</s>（完成）
- 9.路由监听，拼接路由
- 10.hooks封装模块
- 11.动态加载组件（react-loadable）