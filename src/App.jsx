import React from 'react';
import './App.css'
import Frame from './components/Frame'
/* 导入路由 */
import { adminRoutes } from './routes/index'
import { Route, Redirect, Switch } from 'react-router-dom';
/* 获取token */
import { getToken } from './utils/auth'
function App() {
  return getToken() ? (
    <Frame>
      <Switch>
        {adminRoutes.map(item => {
          return <Route key={item.path} {...item} />
        })}
        {/* 跳转第一个 */}
        <Redirect to={adminRoutes[0].path} from='/admin' />
      </Switch>
    </Frame>
  ) : (<Redirect to="/login" />);
}

export default App;
