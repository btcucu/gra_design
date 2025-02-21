import React from 'react';
import {Table} from 'antd';
import type {TableColumnsType} from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'id',
    fixed: 'left',
  },
  {
    title: '品牌',
    width: 100,
    dataIndex: 'brand',
    fixed: 'left',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    width: 150,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 150,
  },
  {
    title: '价位',
    dataIndex: 'price_level',
    width: 150,
  },
  {
    title: '当前库存量',
    dataIndex: 'current_stock',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const dataSource = Array.from({length: 100}).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

const App: React.FC = () => {
  return (
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter']
        }}
        style={{ margin: 0 }}
        scroll={{x: 'max-content', y: 'calc(90vh - 200px)'}}
      />
  );
};

export default App;
