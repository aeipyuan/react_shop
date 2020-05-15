
- 创建react-app
```javascript
npx create-react-app react_shop
```
- 安装依赖
```javascript
npm i react-router-dom redux antd  @ant-design/icons axios --save
```
- 封装token操作
```javascript
/* auth.js */
let getToken = () => window.localStorage.getItem('token');
let setToken = (val) => window.localStorage.setItem('token', val);
let clearToken = () => window.localStorage.removeItem('token');
export { getToken, setToken, clearToken };
```
- 请求拦截
```javascript
import axios from 'axios'
import { getToken } from "./auth";
let request = axios;
/* url */
request.defaults.baseURL = "http://localhost:3009/api/v1/";
/* 拦截 */
request.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + getToken();
    return config;
})
/* 导出服务器域名 */
let serveUrl = "http://localhost:3009";
export { request, serveUrl };
```
- 路由配置
```javascript
/* route > index.js */
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
```
- redux配置
```javascript
/* actions > product.js */
import { request } from '../../utils/request'
export default params => async dispatch => {
    let res = await request.get('/admin/products', { params });
    dispatch({
        type: "GETLIST",
        data: {
            ...res.data,
            /* 页码和size也存入redux */
            page: params.page ? params.page : 1,
            per: params.per ? params.per : 1
        }
    })
}
/* index.js */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notice from './reducers/notice'
import product from './reducers/product'
let reducers = combineReducers({ notice, product })
export default createStore(reducers, applyMiddleware(thunk))
```
- 入口配置
``` javascript
/* index.jsx */
<Provider store={store}>
<Router>
    <Switch>
    {/* admin开头的转到App渲染 */}
    <Route path="/admin" render={props => <App {...props} />} />
    {/* 根据路由配置生成Route */}
    {mainRoutes.map(item => {
        return <Route key={item.path} {...item} />
    })}
    {/* '/' 跳转到主页*/}
    <Redirect from='/' to="/admin" />
    <Redirect to="/404" />
    </Switch>
</Router>
</Provider>
```

- App组件

```javascript
getToken() ? (
<Frame>
    <Switch>
    {adminRoutes.map(item => {
        return <Route key={item.path} {...item} />
    })}
    {/* 跳转第一个 */}
    <Redirect to={adminRoutes[0].path} from='/admin' />
    </Switch>
</Frame>
) : (<Redirect to="/login" />)
```