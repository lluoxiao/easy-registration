import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);

