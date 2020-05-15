## 项目搭建
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
/* request.js */
import axios from 'axios'
import { getToken } from "./auth";
let request = axios;
/* url */
request.baseUrl = "http://localhost:3009/api/v1/";
/* 拦截 */
request.interceptors.request.use((config) => {
    config.header.Authorization = "Bearer " + getToken();
    return config;
})
export { request };
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
## 入口配置
``` javascript
/* index.jsx */
ReactDOM.render(
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
  </Router>,
  document.getElementById('root')
);
```
- 主页
```javascript
function App() {
  return (
    <Frame>
      <Switch>
        {adminRoutes.map(item => {
          return <Route key={item.path} {...item} />
        })}
        {/* 跳转第一个 */}
        <Redirect to={adminRoutes[0].path} from='/admin' />
      </Switch>
    </Frame>
  );
}
```
使用antd的布局构建Frame
```javascript
function index(props) {
    return (<Layout>
        <Header className="header">
            <div className="logo" >
                <img src="./logo192.png" alt="logo" style={{
                    height: 50
                }} />
            </div>
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
```



```javascript
```


```javascript
```


```javascript
```