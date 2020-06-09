import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import dva, { history } from './dva';
import models from './models/index';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();

function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={dvaApp.history}>
        <ConfigProvider locale={zh_CN}>{children}</ConfigProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default AppWrapper;
