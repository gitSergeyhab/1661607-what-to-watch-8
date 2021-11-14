import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import {FILMS, COMMENTS} from './mocks';
import { reducer } from './store/reducer';
import { getGenreList } from './util';

/* eslint-disable no-console */


fetch('https://8.react.pages.academy/wtw/films', {headers: {'X-Token' : 'React ....'}})
  .then((r) => r.json())
  .then((r) => getGenreList(r))
  .then((r) => console.log(r));


const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App films={FILMS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth}/>
  </Provider>,
  document.getElementById('root'));

