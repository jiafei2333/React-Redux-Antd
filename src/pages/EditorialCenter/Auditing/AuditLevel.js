import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Table, Checkbox } from 'antd';
import { PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import EditorialCenterMenu from '../components/EditorialCenterMenu';
import {GET_AUDITLEVEL_DATA} from 'Redux/action-types';

class AuditLevel extends Component {
     constructor(props){
        super(props);
        this.state = {
            PageIndex: 1,
            PageSize: 10
        };
        this.getColumns = this.getColumns.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
     }
      /************生命周期                             **************/
      componentDidMount(){
        const {PageIndex, PageSize} = this.state;
        this.props.getEditorialCenterList({
            Keyword: "",
            SSubmitTime: "",
            ESubmitTime: "",
            FlowType: 0,
            ReviewStatus: 99,
            PageIndex: PageIndex,
            PageSize: PageSize,
            Sort: 0,
          });
      }
    

      onChange(){

      }
      getColumns(){
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
                    <img src="/assets/icon-unlock.png" style={{width: "24px",verticalAlign: "bottom", marginRight: "10px"}} />
                    <span>可编辑</span>
                  </div> :
                  <div>
                    <img src="/assets/icon-lock.png" style={{width: "24px",verticalAlign: "bottom", marginRight: "10px"}}/>
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
      handleChange(){

      }
      render() {
        const {AuditLevelList} = this.props.contentData;
        const {PageIndex, PageSize} = this.state;
        console.log("render-----------", AuditLevelList);
        return (
            <>
                <EditorialCenterMenu mainMenu={this.props.mainMenu} />
                <Table 
                    columns={this.getColumns()} 
                    rowKey={'ArticleID'}
                    dataSource={get(AuditLevelList,"Items") ?get(AuditLevelList,"Items") : []} 
                    style={{backgroundColor:'#fff',borderRadius:'5px'}}
                    pagination={{
                        total:get(AuditLevelList,"Count") ? get(AuditLevelList,"Count") : 0,
                        showTotal:(total) => `共 ${total} 条记录 第${PageIndex}页`,
                        pageSize:PageSize,
                        current:PageIndex,
                        defaultCurrent:1,
                        showSizeChanger :true,
                        showQuickJumper:true,
                    }}
                    onChange={this.handleChange}
                />
            </>
            
        );
      }
}

const mapStateToProps = (state) => ({
    contentData: state.contentReducer,
    mainMenu: state.appReduce.mainMenu,
})

const mapDispatchToProps = dispatch =>{
    return {
        getEditorialCenterList: (data) => dispatch({type: GET_AUDITLEVEL_DATA, payload: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuditLevel);
