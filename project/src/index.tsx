import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { queryApi } from './services/query-api';

import 'react-toastify/dist/ReactToastify.css';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

