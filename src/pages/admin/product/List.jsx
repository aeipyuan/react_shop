import React, { useEffect } from 'react'
import { Card, Button, Table, Divider, Popconfirm, message } from 'antd'
import "antd/dist/antd"
/* redux */
import { connect } from 'react-redux'
import getList from '../../../store/actions/product'
/* 服务 */
import { request, serveUrl } from '../../../utils/request'
function List(props) {
    const columns = [
        {
            title: '序号',
            key: 'id',
            align: 'center',
            render: (txt, record, index) => index + 1
        },
        {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '主图',
            dataIndex: 'coverImg',
            key: 'coverImg',
            align: 'center',
            render: (txt, record, index) => {
                return <img src={serveUrl + record.coverImg}
                    style={{
                        width: 60,
                        height: 60
                    }} alt="img" />
            }
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        }, {
            title: '状态',
            dataIndex: 'onSale',
            key: 'onSale',
            align: 'center',
            render: (txt) => txt ? "在售中" : "已下架"
        }, {
            title: '操作',
            align: 'center',
            render: (txt, record, index) => {
                return (<div>
                    {/* 修改 */}
                    <Button size="small" type="primary" onClick={
                        () => props.history.push('/admin/product/edit/' + record._id)
                    }>修改</Button>
                    {/* 删除 */}
                    <Popconfirm placement="top" title={"确认删除吗"} onConfirm={() => deleteData(record)} okText="确认" cancelText="取消">
                        <Button size="small" type="danger" style={{ margin: "0 10px" }}>删除</Button>
                    </Popconfirm>
                    {/* 上架 */}
                    <Button size="small" onClick={() => changeStatu(record)}>
                        {record.onSale ? '下架' : '上架'}</Button>
                </div>)
            }
        }
    ];
    /* 获取数据 */
    let getData = (params) => {
        props.dispatch(getList({ page, per, ...params }));
    }
    let { list, total, page, per } = props;
    /* 初始化 */
    useEffect(() => {
        getData({ page: 1, per: 3 });
    }, [])
    /* 修改状态 */
    const changeStatu = async record => {
        record.onSale = !record.onSale;
        await request.put('/admin/products/' + record._id, { ...record });
        getData();
    }
    /* 删除 */
    const deleteData = async (record) => {
        let res = await request.delete('/admin/products/' + record._id);
        message.info(res.statusText)
        getData();
    }
    return (
        <Card title="商品列表" extra={<Button type="primary" size="small" onClick={
            () => props.history.push('/admin/product/edit')
        }>添加</Button>}>
            <Table rowKey="_id" dataSource={list} columns={columns} pagination={{
                total,
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ['2', '4', '6'],
                onChange: (page, per) => getData({ page, per }),
                onShowSizeChange: (page, per) => getData({ page, per }),
            }} bordered />
        </Card>
    )
}

export default connect(state => state.product)(List)
