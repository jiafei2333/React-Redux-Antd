import React from 'react';
import loadingPic from 'Assets/loading.png';
import './style.less';

const Loading = ()=>{
    return (
        <div>
            <img src={loadingPic} className={loadingPic} />
        </div>
    )
}
export default Loading;