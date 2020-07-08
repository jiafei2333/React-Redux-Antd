import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Card } from 'antd';
import get from 'lodash/get';
import './style.less';

import Login from './components/Login';
import {LoginPost, getSiteConfig, getThemeConfig} from 'Redux/actions/home';


const tabListNoTitle = [{
    key: 'login',
    tab: '账号密码登录',
  }, {
    key: 'weixin',
    tab: '微信登录',
  }];

export class LoginIndex extends Component {
    constructor(props){
        super(props);
        this.state = {  
            key: 'tab1', 
            noTitleKey: 'login' ,
            number: 0
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    /** 生命周期*********************************** */
    componentDidMount(){
        this.props.actions.getSiteConfig();
        this.props.actions.getThemeConfig();
    }
    /** 生命周期*********************************** */
    onTabChange = (key) =>{

    }
    onSubmit(value){
        this.props.actions.LoginPost({userName: value.username, password: value.password});
    }
    render() {
        const {siteConfig} = this.props;
        const loginBgStyle = {
            background: `url(${get(siteConfig, "LoginPage.Background")})`,
          }
        const contentListNoTitle = { login: <Login onSubmit={this.onSubmit} />, weixin: <div>2</div> };
        return (
            <div className='loginIndex' style={loginBgStyle}>
                <div>
                <img src={get(siteConfig, "LoginPage.Logo")} className='loginLogo'/>
                <img src={get(siteConfig, "LoginPage.CenterImage")} className='loginTitle'/>
                <img  src={get(siteConfig, "LoginPage.BottomImage")} className='loginImg'/>
                </div>
                <div className={'CopyRight'}>
                    <p style={{marginBottom: '0'}}> {get(siteConfig,"CopyrightName")}  </p>
                    <p style={{marginBottom: '0'}}> 杭州前方信息技术有限公司 提供技术支持 </p>
                    <p> {get(siteConfig,"ICPName")} </p>
                </div>
                <Card
                    className={'cardMain'}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={(key) => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    siteConfig: state.appReduce.siteConfig
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({LoginPost, getSiteConfig, getThemeConfig}, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginIndex);