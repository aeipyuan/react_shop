import Login from '../pages/Login'
import Edit from '../pages/admin/product/Edit'
import List from '../pages/admin/product/List'
import PageNotFound from '../pages/PageNotFound'
import Dashboard from '../pages/admin/dashboard'
import Notice from '../pages/admin/notice'
/* 图标 */
import React from 'react'
import { ShoppingOutlined, DashboardOutlined } from "@ant-design/icons";
let mainRoutes = [
    {
        path: '/login',
        component: Login
    }, {
        path: '/404',
        component: PageNotFound
    }
];
let adminRoutes = [
    {
        title: '看板',
        path: '/admin/dashboard',
        component: Dashboard,
        isShow: true,
        icon: <DashboardOutlined />
    }, {
        title: '产品',
        path: '/admin/product',
        component: List,
        isShow: true,
        exact: true,
        icon: <ShoppingOutlined />
    }, {
        path: '/admin/product/edit/:id?',
        component: Edit,
    }, {
        path: '/admin/notice',
        component: Notice
    }
]
export { adminRoutes, mainRoutes }