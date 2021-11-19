import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import { createAPI } from './services/api';
import { requireLogout } from './store/action';
import { checkAuthStatus, fetchFilmsAction, fetchPromoAction } from './store/api-actions';
import { rootReducer } from './store/root-reducer';


const api = createAPI(() => store.dispatch(requireLogout()));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(checkAuthStatus());
store.dispatch(fetchPromoAction());
store.dispatch(fetchFilmsAction());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

