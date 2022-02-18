
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

import App from './App';
import store from './app/store';

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
