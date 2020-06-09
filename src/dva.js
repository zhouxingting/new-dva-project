import { create } from 'dva-core';
import createLoading from 'dva-loading';

import * as dayjs from 'dayjs';
import zhCn from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(zhCn);
dayjs.extend(relativeTime);

let app, store, dispatch, registered;

function createApp(options) {
  const { models } = options;
  app = create({
    ...options,
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
