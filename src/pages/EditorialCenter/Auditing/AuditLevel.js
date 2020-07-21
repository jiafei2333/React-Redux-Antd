import React, { Component } from 'react';
import { Table } from 'antd';

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
export default class AuditLevel extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        );
      }
}


  