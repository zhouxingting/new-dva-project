import * as React from 'react';
import loadable from '@loadable/component';
import RouterLoading from '@/components/RouterLoading';

export default [
  {
    key: '/',
    path: '/',
    component: loadable(() => import('../pages/index'), {
      fallback: <RouterLoading />,
    }),
  },
];
