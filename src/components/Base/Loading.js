import React from 'react';
import Style from './style.less';

const Loading = ()=>{
    return (
        <div className={Style.loadingBox}>
            <span className={Style.loadingImg}></span>
            {/* <img src={'../../assets/loading.png'} className={Style.loadingImg} /> */}
        </div>
    )
}
export default Loading;