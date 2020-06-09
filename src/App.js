import React from 'react';
import routes from '@/routes';
import renderRoutes from '@/routes/renderRoutes';

import AppWrapper from './AppWrapper';

function App(props) {
  return <AppWrapper>{renderRoutes(routes, {})}</AppWrapper>;
}

export default App;
