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
  //console.log("mainMenu::", mainMenu)
  if( !parentSliderKey && !curSliderKey && !thirdSliderKey) return '/404';

  let leftMenu = mainMenu.find( item => {
    return item.ModeUrl === `/${parentSliderKey}`;
  })
  //console.log("leftMenu:---", leftMenu)
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
  //console.log("leftMenu::", leftMenu, parentSliderKey, curSliderKey, thirdSliderKey);
  // 2、当前网址为二级栏目
  if(parentSliderKey && curSliderKey && !thirdSliderKey){
    return {leftMenu, thirdMenu: `/${parentSliderKey}/${curSliderKey}`}
  }
  // 3、当前网址为三级栏目
  if(parentSliderKey && curSliderKey && thirdSliderKey){
    //console.log("**为三级目录~~")
    thirdMenu = `/${parentSliderKey}/${curSliderKey}/${thirdSliderKey}`;
  }else{
    // 当前栏目为一级栏目 所以默认限制第0个为初始子栏目
    thirdMenu = get(leftMenu,"0.ModeUrl");
  }

  if(thirdMenu === "" && get(leftMenu,"0.ChildList.length") > 0){
    thirdMenu = get(leftMenu,"0.ChildList.0.ModeUrl");
  }
  //console.log("thirdMenu::", thirdMenu)
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

// 页面按钮显示
//页面要一直找到最底层,地址只有一个/的时候找到二级的第一个child的最底层
export const pageButton = (item,text)=>{
  ////console.log('方法传入的值数据：--',item,text, (window.location.pathname.split('/')).length-1,_.get(_.split(window.location.pathname, '/'), 1))
  let i,button=false;
  let pathname=window.location.pathname;
  let lev = (pathname.split('/')).length-1
  ////console.log(lev)
  let firNav = _.get(_.split(window.location.pathname, '/'),1);
  if(`${window.localStorage.getItem("AccountID")}` === `${10000}`){
    return true
  }else{
    if(lev===1){
      ////console.log('进入只有一级的地址')
      item.some(function(sec,i){
        if(sec.ModeCode===firNav){
          ////console.log('进入当前排第一个的目录',sec.ModeCode)
            if(sec.ChildList[0].ChildList&&sec.ChildList[0].ChildList.length>0){
              let thr= sec.ChildList[0].ChildList[0].OperateList
              ////console.log('打印最里层按钮目录：--',thr)
              _.map(thr,(value,t)=>{
                if(value.RightCode === text){
                  ////console.log('打印最里层对应的按钮：--',value.RightName)
                  button= true
                  return;
                }
              })
            }else{
              if(sec.ChildList[0].OperateList&&sec.ChildList[0].OperateList.length>0){
                sec.ChildList[0].OperateList.find(function(value,i){
                  if(value.RightCode === text){
                    button= true;
                    return ;
                  }
                })
              }
            }
        }
      })
    }else if(lev>1){
      item.some(function(sec,i){
        if(sec.ModeCode===firNav){
          ////console.log('进入找到的一级目录：--',sec.ModeCode,pathname)
          button = chilPath(sec.ChildList,text,pathname);
          ////console.log('result返回的布尔值：--',button)
          return;
        }
      })
    }
  }
  return button;
}
export const chilPath=(obj,text,pathname)=>{
  let j,result=false;
  if (!obj || !obj.length) return;
  if(result){
    return result;
  }else{
    for(j=0;j<obj.length;j++){
      ////console.log('现在进入的二级目录：--',obj[j].ModeName)
      if(obj[j].ChildList&&obj[j].ChildList.length>0){
        //chilPath(obj[j].ChildList,text,pathname)
        //console.log()
        _.map(obj[j].ChildList,(value,i)=>{
          if(value.ModeUrl===pathname){
            value.OperateList.find(function(ope,k){
              if(ope.RightCode === text){
                result= true;
                return;
              }
            })
          }
        })
      }
      else{
        if(obj[j].ModeUrl===pathname){
          ////console.log('现在进入的二级目录mubiao ：--',obj[j].ModeName)
          if(obj[j].OperateList&&obj[j].OperateList.length>0){
            obj[j].OperateList.find(function(value,i){
              ////console.log('平台审核的按钮：--',value.RightName,value.RightCode,text)
              if(value.RightCode === text){
                result= true;
                return;
              }
            })
          }
        }
      }
    }
    return result;
  }
}