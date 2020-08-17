import React from 'react';
import { connect } from 'react-redux';
import {Icon, Checkbox, Modal, Table, Input, Button,DatePicker} from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';
import { get, cloneDeep, map} from 'lodash';
import {pageButton} from 'Util/commonFun';
import EditorialCenterMenu from '../components/EditorialCenterMenu';
import {GET_PROJECT_APP_REQUEST, GET_WAITING_PUBLISH_REQUEST} from 'Redux/action-types';
import Style from '../style.less';

// const LayerSaveCheck = React.lazy(()=>import('../../../components/Layer/LayerSaveCheck'));
// const LayerSaveCheckPending = React.lazy(()=>import('../../../components/Layer/LayerSaveCheckPending'));
// const LayerSaveCheckResolve = React.lazy(()=>import('../../../components/Layer/LayerSaveCheckResolve'));

// const AppSynchronizationModel = React.lazy(()=>import('../../modelPop/AppSynchronization'));

// const AuditSteps = React.lazy(()=>import('../../Monitor/component/AuditSteps'));

const { RangePicker } = DatePicker;

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
          <a onClick={()=>this.onClickShowSynchronousModel("RouteToWritingDetails", record.ArticleID)}  style={{margin: 0}}> {record.Title.length>25?record.Title.substring(0,26)+'...':record.Title} </a>
          <span>（{record.WordCount}字）</span>
      </div>
      )
    },{
      title: '投稿人',
      dataIndex: 'SourceAccountName',
      key:'SourceAccountName',
    },{
      title: '编辑',
      dataIndex: 'ArticleAccountName',
      key:'ArticleAccountName',
    },{
      title: '审核通过时间',
      dataIndex: 'PassTime',
      key: 'PassTime'
    }
  ];

class TobeIssuedManuscript extends React.Component{
  constructor(props){
    super(props)
    this.state={
      // 筛选条件
      HasImage: false,
      HasVideo: false,
      PageIndex: 1,
      PageSize: 10,
      Keyword: "",
      time: "",
      checked: true,
      checkedObj: {},
      AppIds: [], //载体
    }
  }
  componentDidMount(){
    this.getMyManuscriptsList();
    // 发布的载体类型
    this.props.getProjectApp();
  }
  getMyManuscriptsList = () => {
    this.setState({checked: true, checkedObj: {}});
    this.props.getWaitingPublish({
        IsOrgView: false,
        HasImage: this.state.HasImage,
        HasVideo: this.state.HasVideo,
        Keyword: this.state.Keyword,
        SCreateDate: this.state.time ? moment(this.state.time[0]).format('YYYY-MM-DD') : "",
        ECreateDate: this.state.time ? moment(this.state.time[1]).format('YYYY-MM-DD') : "",
        AppIds: this.state.AppIds,
        PageIndex: this.state.PageIndex,
        PageSize: this.state.PageSize,
    });

  }
  //搜索
  searchInput = (e) => {
    this.setState({Keyword: e.target.value})
  }

  //日历选择
  rangePicker = (value) => {
      console.log("时间", value)
      this.setState({time: value});
  }
  clearState = () =>{
    this.setState({
      Keyword:"",
      PageIndex:1,
      time: "",
      AppIds:[],
      HasImage: false,
      HasVideo: false,
    }, function(){
      this.getMyManuscriptsList();
    })
  }
  searchFun = () => {
    this.setState({
      PageIndex:1,
    }, function(){
      this.getMyManuscriptsList();
    })
  }
  //------------------------------------------------- 生命周期 ----------------------------------------------------------

  //--------------------------------------------------- 操作 ------------------------------------------------------------
  // 方法回调
  updateListFunc= () => {
    const _that = this
    // 更新页面数据
    _that.props.dispatch({type:'pager/GET_DATA_mediaAnnulsManuscript'});
  }



  // 获取已绑定第三方后进行操作
  updateListQianChengFunc = (data) =>{
    if(typeof data!== 'undefined' &&data.Data.length !== 0){
      for(let i= 0;i<data.Data.length;i++){
        // 拿到的同步数据 如果是千橙 就请求栏目列表
        if(data.Data[i].AppID == 2){
        //   this.props.dispatch({type: 'content/getQianChengGetAllClassify2', data: {AppAccountID:data.Data[i].AppAccountID}});
        }
      }
    }else{
      // 模拟请求 主要是为了 loading 加载消失问题
    //   this.props.dispatch({type: 'content/getQianChengGetAllClassify2',data:null})
    }
  }


  handleChange = (pagination, filters) => {
    this.setState({
        PageIndex:pagination.current,
        PageSize:pagination.pageSize},
        function () {
        this.getMyManuscriptsList();
      })
  }
  onChange = (obj) => {
    const { dispatch, tobeIssuedList } = this.props;

    let _tobeIssuedList = cloneDeep(tobeIssuedList);
    let _num = _tobeIssuedList.Items.findIndex( item => {
      return item.ArticleID === obj.ArticleID;
    })
    let _checked;
    let _checkedObj = obj;
    if(_tobeIssuedList.Items[_num].checked === true){
      _checked = true;
      _tobeIssuedList.Items[_num].checked = false;
    }else{
      _checked = false;
      _tobeIssuedList.Items.forEach( (item) => {
        item.checked = false;
      });
      _tobeIssuedList.Items[_num].checked = true;
    }
    this.setState({checked: _checked, checkedObj: _checkedObj});

    // dispatch({type: 'content/setParams', params: 'tobeIssuedList', paramsValue: _tobeIssuedList});
  }

  // 按钮操作
  onClickShowSynchronousModel = (type, Reviewer = 0) =>{
    // const {dispatch} = this.props;

    // dispatch({type: 'commonModel/editorialCenterBtnOperation',
    //   name: type,
    //   currentObj: this.state.checkedObj,
    //   callbackFun: this.updateListQianChengFunc,
    //   callbackUpdateFun: this.getMyManuscriptsList,
    //   Reviewer: Reviewer
    // })
  }
  //签发文字提示 点击确定  刷新
  saveCheckUpdateList = () => {
    this.getMyManuscriptsList();
    // this.props.dispatch({type: 'content/setSaveCheckPending', resolveVisible: false,visible: false});
  }
  // 删除
  articleDelete = () => {
    Modal.confirm({
      title:'提示',
      content:`您确定要删除该文章吗？`,
      okText: '确定',
      className: 'modelStyleTop',
      cancelText: '取消',
      onOk:()=>  {
        // this.props.dispatch({ type:'content/postArticleDeleteManuscriptFunc',
        // data:{ArticleID:this.state.checkedObj.ArticleID},
        // callBackFunc: () => {
        //   this.getMyManuscriptsList();
        // }})
    }})
  }
  //发布载体选择
  projectAppChange = (id) =>{
    this.setState(({ AppIds }) => ({
      AppIds: AppIds.includes(id)
        ? AppIds.filter(item => item !== id)
        : [...AppIds, id],
        PageIndex: 1,
    }),()=>{
      this.getMyManuscriptsList();
    })
  }
  //稿件内容选择
  onMConChange = (name,e) => {
    if(name==='pic'){
      this.setState({
        HasImage:e.target.checked,
        PageIndex: 1,
      },()=>{
        this.getMyManuscriptsList();
      })
    }else if(name==='vio'){
      this.setState({
        HasVideo:e.target.checked,
        PageIndex: 1,
      },()=>{
        this.getMyManuscriptsList();
      })
    }
  }
  //--------------------------------------------------- 渲染 ------------------------------------------------------------
  render(){
    const {tobeIssuedList, projectApp, mainMenu} = this.props;
    console.log("render------------", tobeIssuedList)
    
    return (
      <div>
        <div>
          {/* <EditorialCenterMenu sumbitData={sumbitData}></EditorialCenterMenu> */}
          <EditorialCenterMenu mainMenu={mainMenu} />
          <div className={ `${Style.manuscriptBox} ${Style.maxWidthBox}`} style={{paddingTop: 0,paddingBottom:0}}>
          <div className={Style.subHead}>
            <div className={Style.item}>
                <span>关键词：</span>
                <Input placeholder="请输入关键词" value={this.state.Keyword}  onChange={this.searchInput.bind(this)} style={{width: 160}} className={Style.marR20}/>
                <span>发布时间：</span>
                <RangePicker   onChange={this.rangePicker.bind(this)} value={this.state.time ? this.state.time : ""} className={Style.marR20}/>
                <Button type="primary" className={Style.marR20} onClick={this.searchFun.bind(this)}>筛选</Button>
                <Button onClick={this.clearState.bind(this)}>清空</Button>
            </div>
            <div className={Style.line}></div>
            <div className={Style.item}>
                <span>发布载体筛选：</span>
                {
                  map(projectApp,(item,i)=>(
                    <Button key={i} className={`${Style.btn} ${this.state.AppIds.includes(item.AppID) ? Style.active : ''}`} size="small" onClick={this.projectAppChange.bind(this,item.AppID)}>{item.AppName}</Button>
                  ))
                }
            </div>
            <div className={Style.line}></div>
            <div className={Style.item}>
                <span>稿件内容：&nbsp;&nbsp;</span>
                <Checkbox onChange={this.onMConChange.bind(this,'pic')}>含图</Checkbox>
                <Checkbox onChange={this.onMConChange.bind(this,'vio')}>含视频</Checkbox>
            </div>
            <div className={Style.line}></div>
            <div className={Style.item}>
              {Boolean(pageButton(mainMenu,'WaitPublish_sy'))&&<Button className={Style.marR20} disabled={this.state.checked} onClick={this.onClickShowSynchronousModel.bind(this, "TobeIssued")}
              >签发</Button>}

              {Boolean(pageButton(mainMenu,'WaitPublish_Record'))&&<Button className={Style.marR20} disabled={this.state.checked} onClick={this.onClickShowSynchronousModel.bind(this, 'AUDITLOGGING')}>审核记录</Button>}
            </div>
          </div>
          <div className={Style.line}></div>


            <Table
                // locale={{
                // emptyText:()=><div><Icon type="frown-o" style={{marginRight:20}} />您还没有稿件呢！</div>
                // }}
                columns={columns}
                dataSource={get(tobeIssuedList,"Items") ? get(tobeIssuedList,"Items") : []} 
                rowKey={'ArticleID'}
                pagination={{
                    total:get(tobeIssuedList,"Count") ? tobeIssuedList.Count : 0,
                    showTotal:(total) => `共 ${total} 条记录 第${this.state.PageIndex}页`,
                    pageSize:this.state.PageSize,
                    current:this.state.PageIndex,
                    defaultCurrent:1,
                    showSizeChanger :true,
                    showQuickJumper:true,
                }}
                // onChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          {/* 审核记录 */}
          {/* <AuditSteps /> */}
          {/* 添加载体组件 */}
          {/* <AppSynchronizationModel actionType={"articleISSUED"}  okText={"签发"} articleData={this.state.checkedObj} /> */}
          {/* 存签文字提示 弹层 */}
          {/* <LayerSaveCheck data={saveCheckData} callBackFunc={this.saveCheckUpdateList.bind(this)} /> */}
          {/* 签发进度 弹层 */}
          {/* <LayerSaveCheckPending data={saveCheckData}/> */}
          {/* 签发结果 弹层 */}
          {/* <LayerSaveCheckResolve data={saveCheckData} callBackFunc={this.saveCheckUpdateList.bind(this)}/> */}
        {/* </Suspense> */}


      </div>
    );
  }
};

const mapStateToProps = (state) => ({
    tobeIssuedList: state.contentReducer.tobeIssuedList,
    projectApp: state.contentReducer.projectApp,
    mainMenu: state.appReduce.mainMenu
})

const mapDispatchToProps = dispatch => {
    return {
        getProjectApp: () => dispatch({type: GET_PROJECT_APP_REQUEST}),
        getWaitingPublish: (data)=>dispatch({type: GET_WAITING_PUBLISH_REQUEST, payload: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TobeIssuedManuscript)



