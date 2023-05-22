import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import store, { persistor } from 'src/redux/store/index';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from "react-dom/client";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

