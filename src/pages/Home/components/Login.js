import React from 'react';
import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {loginNameReg, passWordReg} from 'Util/commonFun';
import Style from './style.less';

const Login = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onSubmit(values);
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} className={Style.loginMain}>
      <Form.Item
        name="username"
        rules={[
          {required: true,message:'请输入账号',validateTrigger:'onSubmit'},
          {validator: loginNameReg},
        ]}
      >
        <Input className={Style.loginInput}  prefix={<UserOutlined />} placeholder="请输入登录账号"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {required: true,message:'请输入密码',validateTrigger:'onSubmit'},
          {validator: passWordReg}
        ]}
      >
        <Input.Password className={Style.loginInput} prefix={<LockOutlined />} placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item>
        <a className={Style.checkPas} onClick={()=>{}}>忘记密码？</a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large"  loading={false} className={Style.btn}>登录</Button>
        <Button size="large" style={{color: "#222"}} className={Style.btn}><Link to="/register">申请入驻</Link></Button>
      </Form.Item>
    </Form>
  );
};


export default Login;
