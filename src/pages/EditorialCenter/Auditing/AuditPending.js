import React, { Component } from 'react'
import { Table } from 'antd';
import EditorialCenterMenu from '../components/EditorialCenterMenu';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
];
  
  const data = [];
  for (let i = 0; i < 3; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
export default class AuditPending extends Component {
    state = {
        selectedRowKeys: [],
      };
    
    
    
      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };
    
      render() {
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
    
        return (
            <>
            <EditorialCenterMenu />
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </>
            
        );
      }
}