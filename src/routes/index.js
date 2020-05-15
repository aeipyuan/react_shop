import Login from '../pages/Login'
import Edit from '../pages/admin/product/Edit'
import List from '../pages/admin/product/List'
import PageNotFound from '../pages/PageNotFound'
import Dashboard from '../pages/admin/dashboard'
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
        path: '/admin/dashboard',
        component: Dashboard,
        isShow: true
    }, {
        path: '/admin/product',
        component: List,
        isShow: false,
        exact: true
    }, {
        path: '/admin/product/edit/:id?',
        component: Edit,
        isShow: false
    }
]
export { adminRoutes, mainRoutes }