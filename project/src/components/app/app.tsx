import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MyList from '../../components/my-list/my-list';
import Main from '../../components/main/main';
import AddReview from '../../components/add-review/add-review';
import MoviePage from '../../components/movie-page/movie-page';
import SignIn from '../../components/sign-in/sign-in';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
// import SignInMessage from '../../components/sign-in/sign-in-message';
// import SignInError from '../../components/sign-in/sign-in-error';
// import HeadGuest from '../../components/head-guest/head-guest';
/* eslint-disable no-console */


import {AppRoute, AuthorizationStatus} from '../../const';
import { Comment, Film } from '../../types/types';

type AppProps = {films: Film[], comments: Comment[], authorizationStatus: AuthorizationStatus}

export default function App({films, comments, authorizationStatus}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main films={films} topFilm={films[0]} authorizationStatus={authorizationStatus}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn/>
        </Route>
        <Route exact path={AppRoute.MyList}>

          {/* <PrivateRoute
            exact
            path={AppRoute.MyList}
            authorizationStatus={AuthorizationStatus.NoAuth}
            render={() => <MyList films={FILMS}/>}
          /> */}

          <PrivateRoute
            exact
            path={AppRoute.MyList}
            authorizationStatus={authorizationStatus}
            myList={<MyList films={films}/>}
          />
        </Route>
        <Route exact path={AppRoute.AddReview}>

          <PrivateRoute
            exact
            path={AppRoute.AddReview}
            authorizationStatus={authorizationStatus}
            myList={<AddReview films={films} authorizationStatus={authorizationStatus}/>}
          />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage films={films} comments={comments} authorizationStatus={authorizationStatus}/>
        </Route>

        <Route exact path={AppRoute.Player}>
          <Player films={films} authorizationStatus={authorizationStatus}/>
        </Route>
        <Route>
          <NotFoundPage authorizationStatus={authorizationStatus}/>
        </Route>

      </Switch>
      {/* <HeadGuest/> */}
      {/* <SignInError/> */}
      {/* <SignInMessage/> */}
    </BrowserRouter>
  );
}
