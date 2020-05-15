import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { mainRoutes } from './routes/index'
/* 使用redux */
import { Provider } from 'react-redux';
import store from './store/index'
ReactDOM.render(
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
  </Provider>,
  document.getElementById('root')
);
