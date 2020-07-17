// import React from 'react';
// import { Layout, Menu } from 'antd';
// import {E} from 'Config/E';

// const { Header, Content, Footer } = Layout;

// const MainLayout = ({store, history, children}) =>{
//     const appReducers = store.getState();
//     let isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
//     console.log("appReducers reducers：", appReducers);
//     return (
//         <>
//         {
//             !isLoginIn ? 
//                 <>{children}</> 
//                 :
//                 <Layout className="layout">
//                 {
//                     appReducers.mainMenu ? 
//                     <Header>
//                         <div className="logo" />
//                         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//                             <Menu.Item key="1">nav 1</Menu.Item>
//                             <Menu.Item key="2">nav 2</Menu.Item>
//                             <Menu.Item key="3">nav 3</Menu.Item>
//                         </Menu>
//                     </Header> : ""
//                 }
//                     <Content style={{ padding: '0 50px' }}>
//                         {children}
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//                 </Layout>
//             }
//         </>
        
//     )
// }

// export default MainLayout;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import map from 'lodash/map';
import {E} from 'Config/E';
import './style.less';

const { Header, Content, Footer } = Layout;

export class MainLayout extends Component {
    constructor(props){
        super(props);
        // this.isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    }
    render() {
        const {mainMenu, children, siteConfig, history} = this.props;
        console.log("MainLayout------------------------------",this.props);
        console.log("MainLayout: ",history.location.pathname === '/login', history.location);
        return (
            <>
            {
                history.location.pathname === '/login' ? 
                    <>{children}</> 
                    :
                    <Layout className="layout">
                        <div className={'topBox'}>
                            <div className={'topAbsolute'} style={{ float:'left', marginLeft: '40px', }}>
                                <Link to="/" >
                                <img className={'logo'} src={`${siteConfig.LogoUrl}`}/>
                                </Link>
                            </div>
                            <Header>
                                <Menu theme="dark" mode="horizontal" selectedKeys={[history.location.pathname]}>
                                    {
                                        map(mainMenu, item=>{
                                            return (
                                                <Menu.Item key={item.ModeUrl}><Link key={item.ModeCode} to={item.ModeUrl}>{item.ModeName}</Link></Menu.Item>
                                            )
                                        })
                                        
                                    }
                                </Menu>
                            </Header> 
                        </div>
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
    mainMenu: state.appReduce.mainMenu,
    siteConfig: state.appReduce.siteConfig
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)


