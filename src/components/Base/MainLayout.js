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


