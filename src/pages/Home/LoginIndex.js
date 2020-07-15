import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import get from 'lodash/get';
import './style.less';
import Login from './components/Login';
import {GET_SITE_CONFIG, GET_THEME_CONFIG, POST_LOGIN_IN} from 'Redux/action-types';


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
            number: 0,
            // siteConfig: this.props.siteConfig
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    /** 生命周期*********************************** */
    componentDidMount(){
        console.log("LoginIndex componentDidMount ----------------- ");
        this.props.getSiteConfig();
        this.props.getThemeConfig();
    }
    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log("getDerivedStateFromProps:", nextProps, prevState,'---:',Reflect.has(prevState.siteConfig, 'RegionsCode'), prevState.siteConfig !== nextProps.siteConfig);
    //     if( Reflect.has(prevState.siteConfig, 'RegionsCode') === false && prevState.siteConfig !== nextProps.siteConfig){
    //         console.log("getDerivedStateFromProps --------------------------------------");
    //         return {
    //             siteConfig: nextProps.siteConfig
    //         }
    //     }
    //     return null;
    // }
    // shouldComponentUpdate(nextProps, nextState){
    //     // debugger;
    //     // console.log("shouldComponentUpdate:", nextProps, nextState, this.state,Reflect.has(this.state.siteConfig, 'RegionsCode'), this.state.siteConfig !== nextProps.siteConfig);
    //     // if( Reflect.has(this.state.siteConfig, 'RegionsCode') === false && this.state.siteConfig !== nextProps.siteConfig){
    //     //     console.log("shouldComponentUpdate:——————————————————————————————————————————————————————————————")
    //     //     this.setState({siteConfig: nextProps.siteConfig},function(){console.log("line51++++++++++++++++++++++++++++++++++++",this.state.siteConfig)});
    //     //     return true;
    //     // }
    //     // return false;
    //     console.log("shouldComponentUpdate:", this.props, nextProps);
    //     return true;
    // }
    // getSnapshotBeforeUpdate(prevProps, prevState){
    //     console.log("getSnapshotBeforeUpdate:", prevProps, prevState);
    //     // debugger;
    //     return null;
    // }
    // componentDidUpdate(prevProps, prevState, snapShot){
    //     // debugger;
    //     console.log("componentDidUpdate:", prevProps, prevState, snapShot);
    // }

    /** 生命周期*********************************** */
    onTabChange = (key) =>{

    }
    onSubmit(value){
        this.props.postLoginIn({userName: value.username, password: value.password});
    }
    render() {
        const {siteConfig} = this.props;
        const loginBgStyle = {
            background: `url(${get(siteConfig, "LoginPage.Background")})`,
          }
        const contentListNoTitle = { login: <Login onSubmit={this.onSubmit} />, weixin: <div>2</div> };

        console.log("LoginIndex:---props:", this.props);
        console.log("LoginIndex:---state:",siteConfig, get(siteConfig, "LoginPage.BottomImage"))
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
        getSiteConfig: ()=> dispatch({type: GET_SITE_CONFIG}),
        getThemeConfig: ()=> dispatch({type: GET_THEME_CONFIG}),
        postLoginIn: (data) => dispatch({type: POST_LOGIN_IN,payload:data})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginIndex);