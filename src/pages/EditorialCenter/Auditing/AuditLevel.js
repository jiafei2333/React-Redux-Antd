import React, {useState, useEffect, useCallback, useReducer} from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, DatePicker, Button, Input, Select  } from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';
import Loadable from 'react-loadable';
import Loading from 'Components/Base/Loading';
import TableFunction from '../components/TableFunction';
import {getEditorialCenterListReviewJson, getArticleGetReviewStatusJson} from 'Redux/actionServer/content';
import useRequest from '../hooks/useRequest';
import {pageButton} from 'Util/commonFun';
import Style from '../style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const EditorialCenterMenu =  Loadable({
  loader: () => import('../components/EditorialCenterMenu'),
  loading: Loading,
})


let initialReviewStatus = {"Text": "全部", "Value": "99"};
let initialState = {
    timeV: "",
    Keyword: "",
    ReviewStatusData: [],
    ReviewStatus: initialReviewStatus
}

function reducer(state, action){
    switch (action.type) {
        case 'SetParams':
          return {
              ...state,
              [`${action.paramsN}`]: action.paramsV
          };
        default:
          return state;
    }
}

function getColumns(){
  const columns = [
    {
      title: '',
      dataIndex: 'checkout' ,
      key:'checkout',
      width:'5%',
      render: (text, record) => ( <Checkbox checked={record.checked === true ? true : false}  onClick={()=>this.onChange(record)}/>)
    },{
      title: '稿件标题',
      dataIndex: 'Title' ,
      key:'Title',
      width:'30%',
      render: (text, record) => ( 
      <div>
          {
            record.HasImage === true &&   <PictureOutlined />
          }
          {
            record.HasVideo === true &&   <VideoCameraOutlined />
          }
          {
            record.CanContinue === true ?
            <a href="#" > {record.Title.length>25?record.Title.substring(0,26)+'...':record.Title} </a>
            :
            <span>{record.Title.length>25?record.Title.substring(0,26)+'...':record.Title}</span>
          }
          <span>（{record.WordCount}字）</span>
        </div>
      )
    },{
      title: '投稿人',
      dataIndex: 'SourceAccountName',
      key:'SourceAccountName',
      render:(text, record)=>{
        return(
          <div>
            <p style={{marginBottom:'0'}}>{record.SourceOrganizationName}</p>
            <p style={{marginBottom:'0'}}>{record.SourceAccountName}</p>
          </div>
        )
      }
    },{
      title: '状态',
      dataIndex: 'ArticleAccountName',
      key:'ArticleAccountName',
      render: (text, record) => (
        <div>
          {
            record.CanReviewable === true ?
            <div>
              <img src={iconUnlock} style={{width: "24px",verticalAlign: "bottom", marginRight: "10px"}} />
              <span>可编辑</span>
            </div> :
            <div>
              <img src="Assets/icon-lock.png" style={{width: "24px",verticalAlign: "bottom", marginRight: "10px"}}/>
              <span>编辑中 - {record.ReviewerName}</span>
            </div>
          }

        </div>
      )
    },{
      title: '送审时间',
      dataIndex: 'PubTime',
      key: 'PubTime',
      // render:  (text) => <ListTime time={text}/>
    }
  ];
  return columns;
}

const AuditLevel = () =>{
    const [{timeV, Keyword, ReviewStatusData, ReviewStatus }, dispatch] = useReducer(reducer, initialState);

    // 本页面组件的参数项(不唯一，所以不封装)
    const [params, setParams] = useState({
        Keyword: "",
        SSubmitTime: "",
        ESubmitTime: "",
        FlowType: 0,
        ReviewStatus: ReviewStatus.Value,
        Sort: 0,
    });
    // 自定义hook
    const {data, loading, PageIndex, PageSize, setPagination} = useRequest(()=>{
        let new_params = Object.assign({}, params, {PageIndex: PageIndex, PageSize: PageSize}); // 拼接列表参数
        return getEditorialCenterListReviewJson(new_params);
    }, [params]);
    // 顶部tab切换数据
    const mainMenu = useSelector(state => state.appReduce.mainMenu);


    /* --------------- 筛选操作     ---------------------------------------------------------------------------*/
    // 时间控件
    const setRangePicker = useCallback((value) => {
        dispatch({type: 'SetParams', paramsN: 'timeV', paramsV: value});
    }, [timeV]);
    // 关键词搜索
    const searchInput = useCallback((e) => {
        dispatch({type: 'SetParams', paramsN: 'Keyword', paramsV: e.target.value});
    }, [Keyword])
    // 状态
    // 获取审核状态数据
    useEffect(()=>{
        getArticleGetReviewStatusJson()
        .then(res=>{
            dispatch({type: 'SetParams', paramsN: 'ReviewStatusData', paramsV: res.Data});
        })
    }, []);
    // 状态change
    const selectChange = useCallback((value) => {
        Sentry.error();
        let _temp = ReviewStatusData.find( item=>{
            return item.Value === value
        });
        dispatch({type: 'SetParams', paramsN: 'ReviewStatus', paramsV: {"Text": _temp.Text, "Value": _temp.Value}});
    }, [ReviewStatusData]);
    // 清空操作
    const clearState = useCallback(() => {
        dispatch({type: 'SetParams', paramsN: 'timeV', paramsV: ''});
        dispatch({type: 'SetParams', paramsN: 'Keyword', paramsV: ''});
        setParams(Object.assign({}, params, {Keyword: "", SSubmitTime: "", ESubmitTime: "", ReviewStatus: initialReviewStatus.Value}));
        dispatch({type: 'SetParams', paramsN: 'ReviewStatus', paramsV: initialReviewStatus});
    }, []);
    // 筛选操作
    const searchFun = () => {
        if(PageIndex !== 1) setPagination({current: 1, pageSize: PageSize}); // 添加搜索条件，PageIndex 初始化
        setParams(Object.assign({}, params, {Keyword: Keyword, SSubmitTime: timeV ? moment(timeV[0]).format('YYYY-MM-DD') : "", ESubmitTime: timeV ? moment(timeV[1]).format('YYYY-MM-DD') : "", ReviewStatus: ReviewStatus.Value,}));
    };

    /** -----------------  权限按钮操作   -------------------------------------------------------------------**/


  return (
    <>
        <EditorialCenterMenu mainMenu={mainMenu} />
        {/* 筛选条件 */}
        <div className={Style.searchBox}>
            <span>关键词：</span>
            <Input placeholder="请输入关键词" value={Keyword}  onChange={searchInput} style={{width: 160}} className={Style.marR20}/>
            <span>提交时间：</span>
            <RangePicker onChange={setRangePicker}  value={timeV} className={Style.marR20}/>
            <span >审核状态：</span>
            <Select value={ReviewStatus.Text} onChange={selectChange} style={{ width: 120 }}  className={Style.marR20}>
            {
            ReviewStatusData &&
            ReviewStatusData.map( (item, index)=>{
                return (
                <Option value={item.Value} key={index}>{item.Text}</Option>
                )
            })
            }
            </Select>
            <Button onClick={searchFun}type="primary" className={Style.marR20} >筛选</Button>
            <Button onClick={clearState}>清空</Button>
        </div>
        {/* 按钮权限 */}
        <div className={Style.searchBox}>
            {Boolean(pageButton(mainMenu,'ReviewAr_Sy'))&&<Button className={Style.marR20} 
            // disabled={
            //   this.state.checked === false && this.state.checkedObj.CanContinue === true ? false : true
            //   } onClick={this.onClickShowSynchronousModel.bind(this, "AuditArticleIssued")}
            >签发</Button>}

            {
              Boolean(pageButton(mainMenu,'ReviewAr_PassSy')) &&
              <Button className={Style.marR20}
              // disabled={this.state.checked === false && this.state.checkedObj.CanContinue === false ? false: true && reviewManuscriptTypeStatus === false ? false: true }
              // disabled={_AUDITEDIT}
              // onClick={this.onClickShowSynchronousModel.bind(this, 'AUDITEDIT')}
              >审核通过由编辑签发</Button>
            }

            {Boolean(pageButton(mainMenu,'ReviewAr_Send'))&&<Button className={Style.marR20}
            // disabled={this.state.checked === false && this.state.checkedObj.CanContinue === true ? false : true && this.state.checkedObj.IsFinalReview === false ? false: true}
            // disabled={_AUDITLEVELOK}
            // onClick={this.onClickShowSynchronousModel.bind(this, 'AUDITLEVELOK', 0)}
            >送审</Button>}

            {Boolean(pageButton(mainMenu,'ReviewAr_Return'))&&<Button className={Style.marR20} 
            // disabled={
            //   this.state.checked === false && this.state.checkedObj.CanContinue === true ? false : true
            // } onClick={this.onClickShowSynchronousModel.bind(this, 'REJECT')}
            // loading={
            //   this.props.loading['content/postArticleAuditRejection']
            // }
            >退回</Button>}

            {Boolean(pageButton(mainMenu,'ReviewAr_ProcRecord'))&&<Button className={Style.marR20} 
            // disabled={this.state.checked} onClick={this.onClickShowSynchronousModel.bind(this, 'AUDITLOGGING')}
            >审核记录</Button>}


        </div>
        {/* 列表通用 table 组件 */}
        <TableFunction loading={loading} getColumns={getColumns()} data={data} PageIndex={PageIndex} PageSize={PageSize} setPagination={setPagination}/>
    </>  
 );
}

export default AuditLevel;