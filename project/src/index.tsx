import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import {FILMS, COMMENTS} from './mocks';
import { Film } from './types/types';
import { getGenreList } from './util';

/* eslint-disable no-console */


fetch('https://8.react.pages.academy/wtw/films', {headers: {'X-Token' : 'React ....'}})
  .then((r) => r.json())
  // .then((r) => r.map((film: Film) => film.genre))
  .then((r) => getGenreList(r))
  .then((r) => console.log(r));

ReactDOM.render(<App films={FILMS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth}/>, document.getElementById('root'));

