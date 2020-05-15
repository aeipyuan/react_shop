import React, { useState, useEffect } from 'react'
import 'antd/dist/antd'
import { Card, Form, Input, InputNumber, Button, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
/* 导入请求 */
import { request, serveUrl } from '../../../utils/request'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
function Edit(props) {
    let id = props.match.params.id;
    // 提交
    let handleSubmit = async (values) => {
        values.coverImg = ImgUrl;
        values.descriptions = editorState.toHTML();
        if (id) {
            let res = await request.put('/admin/products/' + id, values);
            if (res.status === 200) {
                message.success('修改成功');
                props.history.push('/admin/product')
            } else {
                message.error('修改失败');
            }
        } else {
            let res = await request.post('/admin/products/', values);
            if (res.status === 200) {
                message.success('添加成功');
                props.history.push('/admin/product')
            } else {
                message.error('添加失败');
            }
        }
    }
    /* 图片上传 */
    let [loading, setLoading] = useState(false);
    let [ImgUrl, setImgUrl] = useState('')
    let handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setImgUrl(info.file.response.info)
            setLoading(false);
        }
    };
    /* 上传按钮 */
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">上传</div>
        </div>
    );
    /* 编辑器 */
    let [editorState, setEditor] = useState(BraftEditor.createEditorState(null))
    /* 编辑器改变 */
    let handleEditorChange = (editorState) => {
        setEditor(editorState);
    }
    /* 初始化获取数据 */
    useEffect(() => {
        if (id)
            getData();
    }, [])
    const [form] = Form.useForm();
    async function getData() {
        let { data } = await request.get('/admin/products/' + id);
        // 表单赋值
        form.setFieldsValue({
            name: data.name,
            price: data.price
        });
        /* 图片和编辑器 */
        setImgUrl(data.coverImg);
        setEditor(BraftEditor.createEditorState(data.descriptions))
    }
    return (
        <Card title={id ? '商品编辑' : '商品添加'}>
            <Form form={form} name="nest-messages" onFinish={handleSubmit} >
                <Form.Item name="name" label="名称" rules={[
                    { required: true, message: '请输入商品名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="价格" rules={[
                    { required: true, message: "请输入商品价格" }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="主图" >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={serveUrl + '/api/v1/common/file_upload'}
                        onChange={handleChange}
                    >
                        {ImgUrl ? <img src={serveUrl + ImgUrl} alt="img" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <BraftEditor
                        value={editorState}
                        onChange={handleEditorChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {id ? '修改' : '添加'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit
