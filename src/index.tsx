import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './routers/Counter';
import NewsFeed from './routers/NewsFeed';

import 'bootstrap/dist/css/bootstrap.min.css';
import UseCallbackDemo from './routers/UseCallbackDemo';
import UseMemoDemo from './routers/UseMemoDemo';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="counter" element={<Counter count={0} />} />
          <Route path="newsfeed" element={<NewsFeed />} />
          <Route path="usecallback" element={<UseCallbackDemo />} />
          <Route path="usememo" element={<UseMemoDemo />} />
          <Route path="*" element={<p>There's nothing here!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
