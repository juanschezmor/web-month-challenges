import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';
import App from './App';
import { ContextProvider } from './context/Context';

import './index.scss';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
