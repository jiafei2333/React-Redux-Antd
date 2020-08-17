import React from 'react';
import loadingPic from 'Assets/loading.png';
import Style from './style.less';

const Loading = ()=>{
    return (
        <div className={Style.loadingBox}>
            <img src={loadingPic} className={Style.loadingImg} />
        </div>
    )
}
export default Loading;