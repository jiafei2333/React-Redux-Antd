import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import '../style.less';

const EditorialCenterMenu = () =>{
    return (
        <Menu
            defaultSelectedKeys={['content']}
            // onClick={this.handleClick}
            // selectedKeys={[current]}
            defaultOpenKeys={['content']}
            mode="horizontal"
            style={{paddingRight: 160}}
        >
            {
                
                    <Menu.Item key={1}>
                        <Link to={''}>公共稿库<span>篇</span><span>篇</span></Link>
                        <Link to={''}>机构稿库<span>篇</span><span>篇</span></Link>
                    </Menu.Item>
                
            }
        </Menu>
    )
}

export default EditorialCenterMenu;
