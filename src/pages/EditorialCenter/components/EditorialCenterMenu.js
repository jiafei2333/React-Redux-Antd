import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import {getArrary, dynamicsUrl} from 'Util/commonFun';
import {get, split} from 'lodash';
import '../style.less';

const EditorialCenterMenu = ({mainMenu}) =>{
    const [current, setCurrent] = useState(get(split(decodeURI(window.location.href),'/'),4));
    const {pathname} = window.location;
    // console.log("EditorialCenterMenu render------1:", sliderData);
    let newUrl, EditorialNav, new_current;
    newUrl = mainMenu ? dynamicsUrl(_.get(_.split(pathname, '/'), 1), _.get(_.split(pathname, '/'), 2), _.get(_.split(pathname, '/'), 3),  mainMenu) : "";
    if(newUrl){
        EditorialNav = get(newUrl,"leftMenu") ? getArrary(get(newUrl,"leftMenu"), get(newUrl,"thirdMenu")) : [];
        new_current = get(newUrl,"thirdMenu") ? get(newUrl,"thirdMenu") : current;
    }
    
    // console.log("EditorialCenterMenu render------2:", newUrl, current, new_current);
    // handleClick = e => {
    //     console.log('click ', e);
    //     this.setState({
    //       current: e.key,
    //     });
    //   };
    return (
        <div>
            {
                EditorialNav?
                <Menu
                    defaultSelectedKeys={['content']}
                    // onClick={handleClick}
                    selectedKeys={[new_current]}
                    defaultOpenKeys={['content']}
                    mode="horizontal"
                    style={{paddingRight: 160}}
                >
                    {
                        EditorialNav.map((item,key)=>(
                            <Menu.Item key={item.ModeUrl}>
                                <Link to={item.ModeUrl}>{item.ModeName}&nbsp;&nbsp;
                                    {item.ModeCode==='manuscriptsubmitted'?<span>(篇)</span>:''}
                                    {item.ModeCode==='manuFeedboxPublic'?<span>(篇)</span>:''}
                                    {item.ModeCode==='annulsManuscript'?<span>(篇)</span>:''}
                                    {item.ModeCode==='InstitutionalRepository'?<span>(篇)</span>:''}
                                    {item.ModeCode==='manuscriptSource'?<span>(篇)</span>:''}
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>:''
            }
        </div>
    )
}

export default EditorialCenterMenu;
