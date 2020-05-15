import React from 'react'
/* antd */
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd'
/* 自定义样式 */
import './Login.css'
/* 操作token */
import { setToken } from '../utils/auth'
import { request } from '../utils/request'
function Login(props) {
    let onFinish = async (values) => {
        let res = await request.post('/auth/manager_login', {
            userName: values.username,
            password: values.password
        })
        if (res.data.code !== 'error') {
            setToken(res.data.token);
            props.history.push('/admin');
        } else {
            message.error(res.data.message)
        }
    }
    return (<div className="back">
        <Card title="登录" className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish} >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]} >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href=""> 忘记密码 </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                     </Button>
                    <a href="" style={{ marginLeft: 10 }}>  注册</a>
                </Form.Item>
            </Form>
        </Card>
    </div>)
}

export default Login
