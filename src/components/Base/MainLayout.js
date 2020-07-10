import React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayout = ({store, history, children}) =>{
    const appReducers = store.getState();
    console.log("appReducers:",store, history, children)
    return (
        <>
        {
            history.location.pathname === '/login' ? 
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


