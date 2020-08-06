
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
` npm install --save-dev @babel/plugin-syntax-dynamic-import `

具体步骤见 https://jiafei2333.github.io/2019/11/13/Webpack-js/

## 1.4 安装开发环境

` npm install --save redux `
` npm install --save react-redux `
` npm install --save redux-saga `
` npm install --save react-router-dom `
`npm install redux-thunk redux-logger --save`
`npm install mini-css-extract-plugin --save-dev` //  抽离css文件

## 1.5 配置node环境

新建 nodejs/server.js 
`nodejs server.js`启动服务

可以安装nodemon node的监视器 监视文件变化:
`npm install nodemon -g 使用： nodemon 文件名（可以增加配置文件）`
`yarn add express`
`yarn add cors`

## 1.6 基础目录创建

![](https://jiafei2333.github.io/html/images/react-redux01.png "")

## 1.7 UI组件库

` npm install antd --save `

## 1.8 错误处理

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


## 3.4 路由问题

### 3.4.1 路由保护

PrivateRoute.js 文件 这样写组件加载失败，之前好几周都是好好的，不知道为什么突然不行了？？

### 3.4.2 刷新问题

【问题】
三级路由`localhost:3000/editorialCenter/auditing/auditPending`刷新界面又 `http://localhost:3000/editorialCenter/auditing/bundle.js 404 (Not Found)` 

【解决】
webpack.base.js

```javascript
output:{
    publicPath: '/'
}
```


### 3.4.3 BrowserRouter 重定向问题

和 HashRouter 不同的是，BrowserRouter路由跳转会根据 /xxx 后面的具体页面去服务器请求，在开发模式下可以配置如下：
```javascript
devServer:{
    historyApiFallback: true,
}
```

在生产环境下，我这里的后台是.net环境，远程桌面是用IIS配置的站点环境，只要在服务器端下载安装 https://www.iis.net/downloads/microsoft/url-rewrite，然后在打包好的跟目录下添加项目中的 `web.config`文件即可。

## 3.5 优化问题

### 3.5.1 babel

#### babel-import-plugin

在.babelrc中配置
```bash
"plugins": [
        ["import",
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": true   // or 'css'
            }
        ]
]
```
跟没有配置对比，多出了将近300k的css文件，其他文件的大小都是一样的 ？？？为啥
[](https://jiafei2333.github.io/html/images/babel-error-Picture.png "")



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

## 4.2 speed-measure-webpack-plugin

`speed-measure-webpack-plugin` 和 `HotModuleReplacementPlugin` 不能同时使用，否则会报错。所以在开发环境中先把费时分析插件注释，见[webpack.base.js]。





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

## 5.3 webpack

### 5.3.1 Source Map

SourceMap是一种映射关系。当项目运行后，如果出现错误，我们可以利用sourceMap反向定位到源码。
sourceMap就是一个信息文件，里面储存着打包前的位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

相关文章：https://juejin.im/post/6844903971648372743


# 6. 功能模块

新增独立的功能模块

## 6.1 采编中心

src/pages/EditorialCenter

自定义`useRequest hook` 封装统一列表逻辑，包括获取列表数据，分页；其中每个页面组件顶部的搜索条件不唯一，所以这里只将 请求列表数据的接口 + PageIndex + PageSize，进行了封装，各个页面的参数以Object.assign 拼接的方式传入。

### 6.1.1 自定义hook

#### 1. 列表数据请求 + 分页

src/pages/EditorialCenter/Auditing/auditPending.js
```javascript
import React, {useMemo} from 'react';
import { Table } from 'antd';
import get from 'lodash/get';
import {getEditorialCenterListJson} from 'Redux/actionServer/content'; // 数据请求接口
import useRequest from '../hooks/useRequest'; // 自定义hook

function getColumns(){
    const  columns = [
        ... 这里是table的column
    ];
  return columns;
}

const AuditPending = () =>{
    // 本页面组件的参数项(不唯一，所以不封装)
    const params = useMemo(()=>({
      Keyword: "",
      SSubmitTime: "",
      ESubmitTime: "",
      FlowType: 0,
      ReviewStatus: 99,
      Sort: 0,
    }));
    const {data, loading, PageIndex, PageSize, setPagination} = useRequest(()=>{
        let new_params = Object.assign({}, params, {PageIndex: PageIndex, PageSize: PageSize}); // 拼接列表参数
        return getEditorialCenterListJson(new_params)
    }, []);


  return (
    <>
        <Table 
            loading={loading}
            columns={getColumns()} 
            rowKey={'ArticleID'}
            dataSource={get(data,"Items") ?get(data,"Items") : []} 
            style={{backgroundColor:'#fff',borderRadius:'5px'}}
            pagination={{
                total:get(data,"Count") ? get(data,"Count") : 0,
                showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
                pageSize:PageSize,
                current:PageIndex,
                defaultCurrent:1,
                showSizeChanger :true,
                showQuickJumper:true,
            }}
            onChange={setPagination}
        />
    </>
    
);
}
export default AuditPending;
```

/redux/hooks/useRequest.js
```javascript
import {useState, useEffect} from 'react';

const useRequest = (fn, dependence) =>{
    const [data, setData] = useState({Items:[], Count: 0});
    const [loading, setLoading] = useState(false);
    const [PageIndex, setPageIndex] = useState(1);
    const [PageSize, setPageSize] = useState(10);

    // 依赖项 = 各个组件自定义的筛选条件参数 + PageIndex + PageSize
    dependence = [...dependence, PageIndex, PageSize];

    const request = useCallback(() =>{
        setLoading(true); // 设置loading
        fn()
        .then(res=>{
            setData(res.Data);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, dependence);

    // 分页
    const setPagination = (pagination) =>{
        setPageIndex(pagination.current);
        setPageSize(pagination.pageSize);
    };
    
    useEffect(() => {
        request()

        return () => { // 销毁
            // request()
        }
    }, dependence);

    return {
        data,
        loading,
        PageIndex,
        PageSize,
        setPagination
    }
}
export default useRequest;
```

#### 2. 列表参数条件查询，添加了日期控件、搜索框

src/pages/EditorialCenter/Auditing/auditPending.js
```javascript
function getColumns(){
    const  columns = [
        ... 这里是table的column
    ];
  return columns;
}
const AuditPending = () =>{
    const [timeV, setTime] = useState("");
    const [Keyword, setKeyword] = useState("");
    // 本页面组件的参数项(不唯一，所以不封装)
    const [params, setParams] = useState({
        Keyword: "",
        SSubmitTime: "",
        ESubmitTime: "",
        FlowType: 0,
        ReviewStatus: 99,
        Sort: 0,
    });

    // 时间控件
    const setRangePicker = useCallback((value) => {
        setTime(value);
    }, [timeV]);
    // 关键词搜索
    const searchInput = useCallback((e) => {
        setKeyword(e.target.value);
    }, [Keyword])
    // 清空操作
    const clearState = () => {
        setTime("");
        setKeyword("");
        setParams(Object.assign({}, params, {Keyword: "", SSubmitTime: "", ESubmitTime: ""}));
    };
    // 筛选操作
    const searchFun = () => {
        setParams(Object.assign({}, params, {Keyword: Keyword, SSubmitTime: timeV ? moment(timeV[0]).format('YYYY-MM-DD') : "", ESubmitTime: timeV ? moment(timeV[1]).format('YYYY-MM-DD') : ""}));
    };

    // 自定义hook
    const {data, loading, PageIndex, PageSize, setPagination} = useRequest(()=>{
        let new_params = Object.assign({}, params, {PageIndex: PageIndex, PageSize: PageSize}); // 拼接列表参数
        return getEditorialCenterListJson(new_params);
    }, [params]);

  return (
    <>
        <div className={'searchBox'}>
            <span>提交时间：</span>
            <RangePicker onChange={setRangePicker}  value={timeV} className={'marR20'}/>
            <span>关键词：</span>
            <Input placeholder="请输入关键词" value={Keyword}  onChange={searchInput} style={{width: 160}} className={'marR20'}/>
            <Button onClick={searchFun}type="primary" className={'marR20'} >筛选</Button>
            <Button onClick={clearState}>清空</Button>
        </div>
        <Table 
            loading={loading}
            columns={getColumns()} 
            rowKey={'ArticleID'}
            dataSource={get(data,"Items") ?get(data,"Items") : []} 
            style={{backgroundColor:'9#fff',borderRadius:'5px'}}
            pagination={{
                total:get(data,"Count") ? get(data,"Count") : 0,
                showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
                pageSize:PageSize,
                current:PageIndex,
                defaultCurrent:1,
                showSizeChanger :true,
                showQuickJumper:true,
            }}
            onChange={setPagination}
        />
    </>
);
}
export default AuditPending;
```
![image](https://jiafei2333.github.io/html/images/useRequest-hook.gif)


#### 3. 这里的state太多，使用 useReducer 改进

```javascript
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, DatePicker, Button, Input, Select  } from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';
import EditorialCenterMenu from '../components/EditorialCenterMenu';
import TableFunction from '../components/TableFunction';
import {getEditorialCenterListJson, getArticleGetReviewStatusJson} from 'Redux/actionServer/content';
import useRequest from '../hooks/useRequest';
import {pageButton} from 'Util/commonFun';

const { RangePicker } = DatePicker;
const { Option } = Select;

let initialReviewStatus = {"Text": "全部", "Value": "99"};
let initialState = {
    timeV: "",
    Keyword: "",
    ReviewStatusData: [],
    ReviewStatus: initialReviewStatus
}

function reducer(state, action){
    switch (action.type) {
        case 'SetParams':
          return {
              ...state,
              [`${action.paramsN}`]: action.paramsV
          };
        default:
          return state;
    }
}

function getColumns(){
    const  columns = [
        ... 这里是table的column
    ];
  return columns;
}

const AuditPending = () =>{
    const [{timeV, Keyword, ReviewStatusData, ReviewStatus }, dispatch] = useReducer(reducer, initialState);

    // 本页面组件的参数项(不唯一，所以不封装)
    const [params, setParams] = useState({
        Keyword: "",
        SSubmitTime: "",
        ESubmitTime: "",
        FlowType: 0,
        ReviewStatus: ReviewStatus.Value,
        Sort: 0,
    });
    // 自定义hook
    const {data, loading, PageIndex, PageSize, setPagination} = useRequest(()=>{
        let new_params = Object.assign({}, params, {PageIndex: PageIndex, PageSize: PageSize}); // 拼接列表参数
        return getEditorialCenterListJson(new_params);
    }, [params]);
    // 顶部tab切换数据
    const mainMenu = useSelector(state => state.appReduce.mainMenu);

    /* --------------- 筛选操作     ---------------------------------------------------------------------------*/
    // 时间控件
    const setRangePicker = useCallback((value) => {
        dispatch({type: 'SetParams', paramsN: 'timeV', paramsV: value});
    }, [timeV]);
    // 关键词搜索
    const searchInput = useCallback((e) => {
        dispatch({type: 'SetParams', paramsN: 'Keyword', paramsV: e.target.value});
    }, [Keyword])
    // 状态
    // 获取审核状态数据
    useEffect(()=>{
        getArticleGetReviewStatusJson()
        .then(res=>{
            dispatch({type: 'SetParams', paramsN: 'ReviewStatusData', paramsV: res.Data});
        })
    }, []);
    // 状态change
    const selectChange = useCallback((value) => {
        let _temp = ReviewStatusData.find( item=>{
            return item.Value === value
        });
        dispatch({type: 'SetParams', paramsN: 'ReviewStatus', paramsV: {"Text": _temp.Text, "Value": _temp.Value}});
    }, [ReviewStatusData]);
    // 清空操作
    const clearState = useCallback(() => {
        dispatch({type: 'SetParams', paramsN: 'timeV', paramsV: ''});
        dispatch({type: 'SetParams', paramsN: 'Keyword', paramsV: ''});
        setParams(Object.assign({}, params, {Keyword: "", SSubmitTime: "", ESubmitTime: "", ReviewStatus: initialReviewStatus.Value}));
        dispatch({type: 'SetParams', paramsN: 'ReviewStatus', paramsV: initialReviewStatus});
    }, []);
    // 筛选操作
    const searchFun = () => {
        if(PageIndex !== 1) setPagination({current: 1, pageSize: PageSize}); // 添加搜索条件，PageIndex 初始化
        setParams(Object.assign({}, params, {Keyword: Keyword, SSubmitTime: timeV ? moment(timeV[0]).format('YYYY-MM-DD') : "", ESubmitTime: timeV ? moment(timeV[1]).format('YYYY-MM-DD') : "", ReviewStatus: ReviewStatus.Value,}));
    };

  return (
    <>
        <EditorialCenterMenu mainMenu={mainMenu} />
        {/* 筛选条件 */}
        <div className={'searchBox'}>
            <span>提交时间：</span>
            <RangePicker onChange={setRangePicker}  value={timeV} className={'marR20'}/>
            <span >审核状态：</span>
            <Select value={ReviewStatus.Text} onChange={selectChange} style={{ width: 120 }}  className={'marR20'}>
            {
            ReviewStatusData &&
            ReviewStatusData.map( (item, index)=>{
                return (
                <Option value={item.Value} key={index}>{item.Text}</Option>
                )
            })
            }
            </Select>
            <span>关键词：</span>
            <Input placeholder="请输入关键词" value={Keyword}  onChange={searchInput} style={{width: 160}} className={'marR20'}/>
            <Button onClick={searchFun}type="primary" className={'marR20'} >筛选</Button>
            <Button onClick={clearState}>清空</Button>
        </div>
        {/* 列表通用 table 组件 */}
        <TableFunction loading={loading} getColumns={getColumns()} data={data} PageIndex={PageIndex} PageSize={PageSize} setPagination={setPagination}/>
    </>  
 );
}

export default AuditPending;
```

将列表页面中的table单独封装如下：

/src/pages/EditorialCenter/components/TableFunction.js
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Table } from 'antd';

const TableFunction = ({loading, getColumns, data, PageIndex, PageSize, setPagination}) =>{
    return (
        <Table 
            loading={loading}
            columns={getColumns} 
            rowKey={'ArticleID'}
            dataSource={get(data,"Items") ?get(data,"Items") : []} 
            style={{backgroundColor:'#fff',borderRadius:'5px'}}
            pagination={{
                total:get(data,"Count") ? get(data,"Count") : 0,
                showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
                pageSize:PageSize,
                current:PageIndex,
                defaultCurrent:1,
                showSizeChanger :true,
                showQuickJumper:true,
            }}
            onChange={setPagination}
        />
    )
}

TableFunction.propTypes = {
    loading: PropTypes.bool,
    getColumns: PropTypes.array,
    data: PropTypes.object,
    PageIndex: PropTypes.number,
    PageSize: PropTypes.number,
    setPagination: PropTypes.func
}
export default TableFunction;
```

# 7. Webpack 优化

[Webpack 优化 详解](https://jiafei2333.github.io/2019/11/14/Webpack-majorization/ "")

见`webpack.prod.js`文件，查看 ` new BundleAnalyzerPlugin() `打包分析结果

## 7.1 按需加载antd

`npm install --save-dev babel-import-plugin`

打包结果分析：失败，见 3.5

## 7.2 优化构建速度

### 7.2.1 Dll

https://jiafei2333.github.io/2019/11/14/Webpack-majorization/ 见 5.DllPlugin && DllReferencePlugin

[webpack.dll.js](https://github.com/jiafei2333/React-Redux-Antd/blob/master/build/webpack.dll.js "")

```bash
General output time took 38.24 secs
```
构建时能够看到`delegated`证明是用引入的`dll/`下提前生成的文件，但是看了耗时，时间并没有缩短，反而还增加了......待解决。

### 7.2.2 include/exclude

[使用include]
```bash
{
    test: /\.js$/,
    use: 'babel-loader',
    include: path.resolve(__dirname, "../src")
},
```
没有配置`include`时，打包耗时如下：
![](https://jiafei2333.github.io/html/images/babel-optimization01.png "")
配置了`include`后，打包耗时如下：
![](https://jiafei2333.github.io/html/images/babel-optimization02.png "")
可以看出构建时间大大缩短了，特别是`babel-loader`的时间，打包时的`babel-loader`耗时同样由20s+缩短为3s+，大大加快了打包时间。

[使用exclude]
```bash
{
    test: /\.js$/,
    use: 'babel-loader',
    exclude: path.resolve(__dirname, "../node_modules/")
},
```
配置了`exclude`后，构建耗时如下：
![](https://jiafei2333.github.io/html/images/babel-optimization03.png "")

## 7.3 SplitChunks

```javascript
optimization:{
	splitChunks: {
	// initial 只操作同步的，all 所有的，async异步的（默认）
	  chunks: 'async', // 默认支持异步的代码分割import()
	  minSize: 30000, // 文件超过30k 就会抽离
	  maxSize: 0,  // 没有最大上限
	  minChunks: 1, // 最少模块引用一次才抽离
	  maxAsyncRequests: 5, // 最大异步请求数，最多5个
	  maxInitialRequests: 3, // 最大初始化请求数，即最多首屏加载3个请求
	  automaticNameDelimiter: '~', // 抽离的命名分隔符 xxx~a~b (如果是a、b文件引用)
	  automaticNameMaxLength: 30, // 名字最大长度
	  name: true,
	  cacheGroups: { // 缓存组  这里面也可以配置上面的配置
		vendors: { // 先抽离第三方
		  test: /[\\/]node_modules[\\/](jquery)|(lodash)/,
		  priority: -1
		},
		react:{
			test: /[\\/]node_modules[\\/](react|react-dom)/,
			priority: -2, 
		},
		default: { 
		  minChunks: 2,
		  priority: -20, // 优先级, -2比 -20大
		  reuseExistingChunk: true
		}
	  }
	}
}
```
打包之后发现效果不明显，可能是这个项目代码太少了....待解释。


# 8. 配置文件

[webpack.base.js](https://github.com/jiafei2333/React-Redux-Antd/blob/master/build/webpack.base.js "")

[webpack.dev.js](https://github.com/jiafei2333/React-Redux-Antd/blob/master/build/webpack.dev.js "")

[webpack.prod.js](https://github.com/jiafei2333/React-Redux-Antd/blob/master/build/webpack.prod.js "")

[.babelrc](https://github.com/jiafei2333/React-Redux-Antd/blob/master/.babelrc "")

# 8. 相关文章

1. https://juejin.im/post/5b4de4496fb9a04fc226a7af
2. https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
3. https://juejin.im/post/5b440f7ae51d45195759f345
4. https://juejin.im/post/5d6771375188257573636cf9
5. [Webpack 优化](https://juejin.im/post/6844904093463347208 "")


# 9. 未完成功能

- 1.loading
  - <s>列表页loading</s>（完成，封装的自定义hook）
  - <s>组件动态加载loading</s>（完成）
  - 按钮loading
- 2.nprogress
- 3.<s>saga代替thunk</s>（完成）
- 4.<s>配置node后台服务</s>（完成）
- 5.antd中局部修改默认样式
- 6.<s>react-hot-loader</s>（完成）
- 7.<s>强制刷新时获取基本信息(菜单权限、配置信息等等)</s>（完成）
- 8.<s>路由监听，拼接路由</s>（完成）
- 9.<s>自定义hooks封装</s>（完成）
- 10.<s>动态加载组件（react-loadable）</s>（完成）
- 11.<s>打包配置-打包分析-打包优化-查看bundle大小 </s>（完成）
- 12.主题色配置
- 13.打包问题、引入样式问题
- 14.<s>Source Map配置及知识点</s>（完成）
- 15.<s>生产环境打包时拷贝web.config文件</s>（完成）
- 16.登录判断 PrivateRoute
- 17.图片打包优化，小图片生成base64等

github项目入口: https://github.com/jiafei2333/React-Redux-Antd



tips:
react-template添加配置
1. webpack.prod.js
2. webpack.base.js
3. Loading组件和loading图
4. babel 和 package.json
5. webpack.dll.js