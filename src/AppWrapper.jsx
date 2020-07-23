import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import dva from './dva';
import models from './models/index';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();

export const history = createBrowserHistory({
  // basename
  basename: process.env.NODE_ENV === 'production' ? '/data' : undefined,
});

function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ConfigProvider locale={zh_CN}>{children}</ConfigProvider>
      </Router>
    </Provider>
  );
}

export default AppWrapper;
