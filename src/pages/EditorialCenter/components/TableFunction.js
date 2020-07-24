import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Table } from 'antd';


const TableFunction = ({loading, getColumns, data, PageIndex, PageSize, setPagination}) =>{
    return (
        <Table 
            loading={loading}
            columns={getColumns} 
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
    )
}

TableFunction.propTypes = {
    loading: PropTypes.bool,
    getColumns: PropTypes.array,
    data: PropTypes.object,
    PageIndex: PropTypes.number,
    PageSize: PropTypes.number,
    setPagination: PropTypes.func
}

export default TableFunction;

