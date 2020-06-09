import React from 'react';
import dva from './dva';
import models from './models/index';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const history = createBrowserHistory({
  // basename
  // basename: process.env.NODE_ENV === 'production' ? '/data' : undefined,
});

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();

function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zh_CN}>{children}</ConfigProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default AppWrapper;
