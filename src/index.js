import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./mock/index";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";
import zhCn from "antd/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCn}>
      <App />
    </ConfigProvider>
  </Provider>
);


