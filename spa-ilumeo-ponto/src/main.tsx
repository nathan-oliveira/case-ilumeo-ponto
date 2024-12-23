import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import './index.css'
import App from './Main/App.tsx'

import store from './Store';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
)
