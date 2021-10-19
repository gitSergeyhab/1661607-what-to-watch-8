import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import {FILMS, COMMENTS} from './mocks';

/* eslint-disable no-console */

// fetch('https://8.react.pages.academy/wtw', {headers: {'X-Token' : 'React ....'}}).then((r) => console.log(r));

ReactDOM.render(<App films={FILMS} comments={COMMENTS} authorizationStatus={AuthorizationStatus.Auth}/>, document.getElementById('root'));
