import React from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash/get';
import {arrKeys, inArr} from 'Util/commonFun';
import '../style.less';

const SliderEditorial = (props) =>{
    const { leftMenu, thirdMenu } = props.menuData;
    console.log("line9 -------", leftMenu, thirdMenu);
    return (
        <div className={'sliderBox'}>
            {
            leftMenu &&
            leftMenu.map( (item, index) => {
                return (
                <Link to={get(item, "ChildList.length") > 0 ? get(item, "ChildList.0.ModeUrl") ? get(item, "ChildList.0.ModeUrl") : '/404' : get(item,"ModeUrl")} key={index}
                    className={`sliderSingle ${inArr(thirdMenu, arrKeys(item.ChildList, 'ModeUrl')) === true ? 'sliderCurr' : ''}`
                }>
                    <span>{item.ModeName}</span>
                    {
                    inArr(thirdMenu, arrKeys(item.ChildList, 'ModeUrl')) === true ? <div className={`square`}></div> : ""
                    }

                </Link>
                )
            })
        }
        </div>
    )
}

export default SliderEditorial;
