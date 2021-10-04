import React from 'react';
import ReactDOM from 'react-dom';
// import MyList from './components/my-list/my-list';
// import App from './components/app/app';
import Main from './components/main/main';
// import AddReview from './components/add-rewiew/add-review';
// import HeadGuest from './components/head-guest/head-guest';
// import MoviePage from './components/movie-page/movie-page';
// import SignIn from './components/sign-in/sign-in';
// import SignInMessage from './components/sign-in/sign-in-message';
// import SignInError from './components/sign-in/sign-in-error';


import {FILMS} from './mocks';


ReactDOM.render(
  <React.StrictMode>
    {/* <AddReview film={FILMS[0]}/> */}
    <Main films={FILMS} topFilm={FILMS[0]}/>
    {/* <HeadGuest/> */}
    {/* <MoviePage film={FILMS[0]} relatedFilms={FILMS.slice(1,5)}/> */}
    {/* <MyList films={FILMS} headerOptions={[HeaderOption.MY_LIST]}/> */}
    {/* <SignIn/> */}
    {/* <SignInError/> */}
    {/* <SignInMessage/> */}
  </React.StrictMode>,
  document.getElementById('root'));
