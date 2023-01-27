import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MainComponent from './components/MainComponent';
import Channel from './pages/Channel';
import Stream from './pages/Stream';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainComponent />,
  },
  {
    path: 'channel/:userId',
    element: <Channel />,
  },
  {
    path: 'channel/:userId/:sereadId',
    element: <Stream />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
