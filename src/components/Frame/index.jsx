import React from 'react'
/* 布局 */
import "./index.css"
import 'antd/dist/antd.css'
import { Layout, Menu, Avatar, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
/* 导入路由信息 */
import { adminRoutes } from '../../routes/index'
/* 包裹路由访问props */
import { withRouter } from 'react-router-dom'
/* 使用Redux */
import { connect } from 'react-redux'
/* 布局 */
const { Header, Content, Sider } = Layout;
/* 过滤 */
const routes = adminRoutes.filter(v => v.isShow);

function index(props) {
    console.log(props)
    const menu = (
        <Menu onClick={(e) => {
            if (e.key === 'notice') {
                props.history.push('/admin/notice');
            }
        }}>
            <Menu.Item key="notice">通知</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="exit">退出</Menu.Item>
        </Menu>
    );
    return (<Layout>
        <Header className="header" style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            {/* 左侧logo */}
            <div className="logo" >
                <img src="./logo192.png" alt="logo" style={{ height: 50 }} />
            </div>
            {/* 下拉菜单 */}
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    超级管理员   <DownOutlined />
                    <Badge dot={!props.isAllRead}></Badge>
                </a>
            </Dropdown>
        </Header>
        <Layout>
            <Sider width={120} className="site-layout-background">
                <Menu mode="inline" defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }} >
                    {routes.map(item => {
                        return <Menu.Item key={item.path} icon={item.icon} onClick={
                            () => props.history.push(item.path)
                        }>{item.title}</Menu.Item>
                    })}
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px 24px 24px' }}>
                <Content className="site-layout-background" tyle={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }} >
                    {props.children}{/* 子元素 */}
                </Content>
            </Layout>
        </Layout>
    </Layout>)
}

export default connect(state => state.notice)(withRouter(index))