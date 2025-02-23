import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, Select, Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {
  deleteProductsUsingPost,
  editProductsUsingPost,
  listProductsUsingPost
} from "@/services/swagger/productsController";

const App: React.FC = () => {
  const [datasource, setDatasource] = useState<API.Products[]>([]);
  const [productSearchRequest, setProductSearchRequest] = useState<API.ProductsSearchRequest>();

  /**
   * 获取产品列表
   */
  const getProductDatasource = async () => {
    const res = await listProductsUsingPost(
      productSearchRequest as API.ProductsSearchRequest
    );
    if (res.code === 0) {
      if (res.data !== null) {
        setDatasource(res.data);
      }
    }
  }

  const columns: TableColumnsType<API.Products> = [
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
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (record) => (
        <>
          <a style={{marginRight: 8}} onClick={
            () => {
              Modal.confirm({
                title: '编辑产品',
                width: 600,
                footer: null,
                content: (
                  <Form
                    initialValues={{
                      id: record.id,
                      brand: record.brand,
                      specification: record.specification,
                      price: record.price,
                      price_level: record.price_level,
                      current_stock: record.current_stock
                    }}
                    onFinish={
                      async (values: API.ProductsRequest) => {
                        const res = await editProductsUsingPost({
                          id: record.id,
                          ...values
                        });
                        if (res.code === 0) {
                          message.success('编辑成功')
                          Modal.destroyAll()
                          getProductDatasource()
                        } else {
                          message.error(res.message)
                        }
                      }
                    }
                  >
                    <Form.Item label="品牌" name="brand">
                      <Input/>
                    </Form.Item>
                    <Form.Item label="规格" name="specification">
                      <Input/>
                    </Form.Item>
                    <Form.Item
                      label="价格"
                      name="price"
                    >
                      <InputNumber
                        min={0}
                        placeholder="请输入价格"
                      />
                    </Form.Item>
                    <Form.Item label="价位" name="price_level">
                      <Select
                        placeholder="请选择价位"
                        options={[
                          {value: '低端', label: '低端'},
                          {value: '中端', label: '中端'},
                          {value: '高端', label: '高端'}
                        ]}
                      ></Select>
                    </Form.Item>
                    <Form.Item label="当前库存量" name="current_stock">
                      <InputNumber disabled/>
                    </Form.Item>
                    <Form.Item label={null}>
                      <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                        提交
                      </Button>
                      <Button onClick={() => Modal.destroyAll()}>
                        取消
                      </Button>
                    </Form.Item>
                  </Form>
                )
              });
            }}>编辑</a>
          <a style={{color: 'red'}} onClick={async () => {
            const res = await deleteProductsUsingPost({id: record.id})
            if (res.code === 0) {
              message.success('删除成功')
              getProductDatasource()
            } else {
              message.error(res.message)
            }
          }}>删除</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    getProductDatasource() // Populate the form with the current datasource values
  }, []);


  return (
    <Table<API.Products>
      columns={columns}
      dataSource={datasource}
      pagination={{
        position: ['bottomCenter']
      }}
      style={{margin: 0}}
      scroll={{x: 'max-content', y: 'calc(90vh - 200px)'}}
    />
  );
};

export default App;
