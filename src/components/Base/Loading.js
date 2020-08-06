import React from 'react';
import loadingPic from 'Assets/loading.png';
import './style.less';

const Loading = ()=>{
    return (
        <div className={'loadingBox'}>
            <img src={loadingPic} className={'loadingImg'} />
        </div>
    )
}
export default Loading;