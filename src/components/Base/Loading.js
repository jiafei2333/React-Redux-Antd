import React from 'react';
import Style from './style.less';

const Loading = ()=>{
    return (
        <div className={Style.loadingBox}>
            <img src={"/assets/loading.png"} className={Style.loadingImg} />
        </div>
    )
}
export default Loading;