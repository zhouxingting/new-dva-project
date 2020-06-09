import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import dva from './dva';
import models from './models/index';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();
const history = dvaApp.getHistory();

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
