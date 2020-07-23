// import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import { Table, Checkbox } from 'antd';
// import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
// import get from 'lodash/get';
// import EditorialCenterMenu from '../components/EditorialCenterMenu';
// import {GET_AUDITPENDING_DATA} from 'Redux/action-types';

// class AuditPending extends Component {
//      constructor(props){
//         super(props);
//         this.state = {
//             PageIndex: 1,
//             PageSize: 10
//         };
//         this.getColumns = this.getColumns.bind(this);
//         this.onChange = this.onChange.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//      }
//       /************生命周期                             **************/
//       componentDidMount(){
//         const {PageIndex, PageSize} = this.state;
//         this.props.getEditorialCenterList({
//             Keyword: "",
//             SSubmitTime: "",
//             ESubmitTime: "",
//             FlowType: 0,
//             ReviewStatus: 99,
//             PageIndex: PageIndex,
//             PageSize: PageSize,
//             Sort: 0,
//           });
//       }
    

//       onChange(){

//       }
//       getColumns(){
//         const  columns = [
//             {
//               title: '',
//               dataIndex: 'checkout' ,
//               key:'checkout',
//               width:'5%',
//               render: (text, record) => ( <Checkbox checked={record.checked === true ? true : false}  onClick={()=>this.onChange(record)}/>)
//             },{
//               title: '稿件标题',
//               dataIndex: 'Title' ,
//               key:'Title',
//               width:'30%',
//               render: (text, record) => ( 
//               <div>
//                 {
//                     record.HasImage === true &&   <PictureOutlined />
//                 }
//                 {
//                     record.HasVideo === true &&   <VideoCameraOutlined />
//                 }
//                 <a href="#"> {record.Title.length>25?record.Title.substring(0,26)+'...':record.Title} </a>
//                 <span>（{record.WordCount}字）</span>
//                 </div>
//             )
//             },{
//               title: '投稿人',
//               dataIndex: 'SourceAccountName',
//               key:'SourceAccountName',
//             },{
//               title: '编辑',
//               dataIndex: 'ArticleAccountName',
//               key:'ArticleAccountName',
//             },{
//               title: '审核状态',
//               dataIndex: 'ArticleStatusText',
//               key:'ArticleStatusText',
//               render: (text, record) => (
//                 <div>
//                   <span>{record.Reviewer}</span>
//                   <p>({record.ArticleStatusText})</p>
//                 </div>
//               )
//             },{
//               title: '送审时间',
//               dataIndex: 'PubTime',
//               key: 'PubTime',
//             //   render:  (text) => <ListTime time={text}/>
//             }
//           ];
//         return columns;
//       }
//       handleChange(){

//       }
//       render() {
//         const {AuditPendingList} = this.props.contentData;
//         const {PageIndex, PageSize} = this.state;
//         console.log("render-----------", AuditPendingList);
//         return (
//             <>
//                 <EditorialCenterMenu mainMenu={this.props.mainMenu} />
//                 <Table 
//                     columns={this.getColumns()} 
//                     rowKey={'ArticleID'}
//                     dataSource={get(AuditPendingList,"Items") ?get(AuditPendingList,"Items") : []} 
//                     style={{backgroundColor:'#fff',borderRadius:'5px'}}
//                     pagination={{
//                         total:get(AuditPendingList,"Count") ? get(AuditPendingList,"Count") : 0,
//                         showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
//                         pageSize:PageSize,
//                         current:PageIndex,
//                         defaultCurrent:1,
//                         showSizeChanger :true,
//                         showQuickJumper:true,
//                     }}
//                     onChange={this.handleChange}
//                 />
//             </>
            
//         );
//       }
// }

// const mapStateToProps = (state) => ({
//     contentData: state.contentReducer,
//     // routerData: state.routerReducer,
//     mainMenu: state.appReduce.mainMenu,
// })

// const mapDispatchToProps = dispatch =>{
//     return {
//         getEditorialCenterList: (data) => dispatch({type: GET_AUDITPENDING_DATA, payload: data})
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AuditPending)


import React, {useState, useCallback, useMemo} from 'react';
import { Table, Checkbox } from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import EditorialCenterMenu from '../components/EditorialCenterMenu';
import iconUnlock from '../../../assets/icon-unlock.png';
import {getEditorialCenterListJson} from 'Redux/actionServer/content';
import useRequest from '../hooks/useRequest';

function getColumns(){
    const  columns = [
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
        <a href="#"> {record.Title.length>25?record.Title.substring(0,26)+'...':record.Title} </a>
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
        title: '审核状态',
        dataIndex: 'ArticleStatusText',
        key:'ArticleStatusText',
        render: (text, record) => (
        <div>
            <span>{record.Reviewer}</span>
            <p>({record.ArticleStatusText})</p>
        </div>
        )
    },{
        title: '送审时间',
        dataIndex: 'PubTime',
        key: 'PubTime',
    //   render:  (text) => <ListTime time={text}/>
    }
    ];
  return columns;
}

const AuditPending = () =>{
    
    // 本页面组件的参数项(不唯一，所以不封装)
    const params = useMemo(()=>({
      Keyword: "",
      SSubmitTime: "",
      ESubmitTime: "",
      FlowType: 0,
      ReviewStatus: 99,
      Sort: 0,
    }));
    const {data, loading, PageIndex, PageSize, setPagination} = useRequest(()=>{
        let new_params = Object.assign({}, params, {PageIndex: PageIndex, PageSize: PageSize}); // 拼接列表参数
        return getEditorialCenterListJson(new_params)
    }, []);


  return (
    <>
        {/* <EditorialCenterMenu mainMenu={this.props.mainMenu} /> */}
        <Table 
            loading={loading}
            columns={getColumns()} 
            rowKey={'ArticleID'}
            dataSource={get(data,"Items") ?get(data,"Items") : []} 
            style={{backgroundColor:'#fff',borderRadius:'5px'}}
            pagination={{
                total:get(data,"Count") ? get(data,"Count") : 0,
                showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
                pageSize:PageSize,
                current:PageIndex,
                defaultCurrent:1,
                showSizeChanger :true,
                showQuickJumper:true,
            }}
            onChange={setPagination}
        />
    </>
    
);

}
export default AuditPending;
