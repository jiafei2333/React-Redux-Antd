import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import map from 'lodash/map';
import SliderEditorial from 'Pages/EditorialCenter/components/SliderEditorial';
import './style.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export class MainLayout extends Component {
    constructor(props){
        super(props);
        // this.isLoginIn = window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
    }
    render() {
        const {mainMenu, children, siteConfig, history, sliderData} = this.props;
        console.log("MainLayout------------------------------",this.props);
        console.log("MainLayout: ",history.location.pathname === '/login', history.location);
        return (
            <>
            {
                history.location.pathname === '/login' ? 
                    <>{children}</> 
                    :
                    <Layout  className="layout">
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
                        <Layout>
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <content className={'contentBox'}>
                                    <SliderEditorial menuData={sliderData}  />
                                    <Content style={{ paddingLeft: 20 }}>
                                        {children}
                                    </Content>
                                </content>
                                
                                <Footer style={{
                                    textAlign: 'center',
                                    }}>
                                    <p style={{marginBottom: '0'}}> {siteConfig.CopyrightName} </p>
                                    <p style={{marginBottom: '0'}}> 杭州XXXX技术有限公司 提供技术支持 </p>
                                    <p> {siteConfig.ICPName} </p>
                                </Footer>
                            </Layout>
                        </Layout>
                    </Layout>
                    
                }
                
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    mainMenu: state.appReduce.mainMenu,
    siteConfig: state.appReduce.siteConfig,
    sliderData: state.routerReducer.sliderData
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)


