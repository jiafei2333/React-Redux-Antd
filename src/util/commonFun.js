import {E} from 'Config/E';
import get from 'lodash/get';
// 登录名
export const loginNameReg = (rule, value, callback) => {
    if((/^[a-zA-Z][a-zA-Z0-9_]{3,20}$/.test(value)) || (/^1[34578]\d{9}$/.test(value))){
      callback();
    }else{
      callback("请输入4-20位用户名,仅包含字母、数字及下划线");
    }
}
// 登录密码
export const passWordReg = (rule,value,callback) => {
    if( value && value.length < 6  || value.length > 30){
      callback("请输入6-30位密码");
    }
    callback();
}
// 存储token
export const setToken = (value) =>{
  window.localStorage.setItem(`${E.SERVER_TOKEN}token`, value);
}
// 取token
export const getToken = ()=>{
  return window.localStorage.getItem(`${E.SERVER_TOKEN}token`);
}
// 根据一级目录推导出当前一级目录下三级目录路径
export const routeListen = (appReduce, routerReducer) =>{
  let currUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  let _split = currUrl.split("/");
  if(_split.length !== 2 || !_split[1] ) return  false;
  let _index = appReduce.mainMenu.findIndex(item=>item.ModeUrl === currUrl);
  let _index2 = routerReducer.routeData.findIndex(item=>item.path === currUrl);
  let tempUrl;
  if(_index > -1 && _index2 === -1){
      tempUrl = get(appReduce.mainMenu[_index], "ChildList.0.ChildList.0.ModeUrl");
      let _obj = {
          path: '/editorialCenter',
          pathTemp: tempUrl
      }
     return _obj;
  }
}


// 根据当前 href 和 mainMenu 获取动态地址
export const dynamicsUrl = (parentSliderKey, curSliderKey, thirdSliderKey, mainMenu) => {
  //即当前应展示的页面地址
  let thirdMenu;
  console.log("mainMenu::", mainMenu)
  if( !parentSliderKey && !curSliderKey && !thirdSliderKey) return '/404';

  let leftMenu = mainMenu.find( item => {
    return item.ModeUrl === `/${parentSliderKey}`;
  })
  console.log("leftMenu:---", leftMenu)
  if(leftMenu === undefined ) return '/404';

  let temp = [];
  // 1、当前网址为一级栏目且没有子栏目
  if(!get(leftMenu,"ChildList.length")){ //
    thirdMenu = leftMenu.ModeUrl;
    temp.push(leftMenu)
    return {leftMenu: temp, thirdMenu};
  }
  //即左侧二级菜单
  leftMenu = get(leftMenu,"ChildList");
  console.log("leftMenu::", leftMenu, parentSliderKey, curSliderKey, thirdSliderKey);
  // 2、当前网址为二级栏目
  if(parentSliderKey && curSliderKey && !thirdSliderKey){
    return {leftMenu, thirdMenu: `/${parentSliderKey}/${curSliderKey}`}
  }
  // 3、当前网址为三级栏目
  if(parentSliderKey && curSliderKey && thirdSliderKey){
    console.log("**为三级目录~~")
    thirdMenu = `/${parentSliderKey}/${curSliderKey}/${thirdSliderKey}`;
  }else{
    // 当前栏目为一级栏目 所以默认限制第0个为初始子栏目
    thirdMenu = get(leftMenu,"0.ModeUrl");
  }

  if(thirdMenu === "" && get(leftMenu,"0.ChildList.length") > 0){
    thirdMenu = get(leftMenu,"0.ChildList.0.ModeUrl");
  }
  console.log("thirdMenu::", thirdMenu)
  if(thirdMenu === "") return '/404';

  return {leftMenu, thirdMenu};
}

export const arrKeys = (data, key) => {
  let ids = [];
  data.forEach( (item) =>{
    ids.push(item[key]);
  })
  return ids;
}

// 是否在该数组内
export function inArr(str, arr) {
  if (Array.isArray(arr) === false) return false;
  for (let i = 0; i < arr.length; i++) {
    if (str === arr[i]) {
      return true;
    }
  }
  return false;
}

export const getArrary = (arr, params) => {
  let temp = [];
  arr.forEach( item => {
    item.ChildList.forEach( v => {
      if(v.ModeUrl === params){
        temp = item.ChildList;
      }
    })
  })
  return temp;
}