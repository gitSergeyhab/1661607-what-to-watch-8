import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {COMMENTS} from './mocks';
import { createAPI } from './services/api';
import { requireLogout } from './store/action';
import { checkAuthStatus, fetchFilmsAction, fetchPromoAction } from './store/api-action';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
/* eslint-disable no-console */


const api = createAPI(() => store.dispatch(requireLogout()));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(checkAuthStatus());
store.dispatch(fetchPromoAction());
store.dispatch(fetchFilmsAction());

ReactDOM.render(
  <Provider store={store}>
    <App comments={COMMENTS}/>
  </Provider>,
  document.getElementById('root'));

