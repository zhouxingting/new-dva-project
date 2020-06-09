import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as dayjs from 'dayjs';
import zhCn from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(zhCn);
dayjs.extend(relativeTime);

let app, store, dispatch, registered;

export const history = createBrowserHistory({
  // basename
  // basename: process.env.NODE_ENV === 'production' ? '/data' : undefined,
});

function createApp(options) {
  const { models } = options;
  app = create({
    ...options,
    initialReducer: {
      routerReducer: connectRouter(history),
    },
    setupMiddlewares(middlewares) {
      return [routerMiddleware(history), ...middlewares];
    },
    setupApp(app) {
      app._history = history;
    },
  });
  app.use(createLoading({}));

  if (!registered) models.forEach((model) => app.model(model));
  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
