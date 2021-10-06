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


import {AppRoute, AuthorizationStatus} from '../../const';
import {FILMS} from '../../mocks';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main films={FILMS} topFilm={FILMS[0]}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn/>
        </Route>
        <Route exact path={AppRoute.MyList}>
          <PrivateRoute
            exact
            path={AppRoute.MyList}
            authorizationStatus={AuthorizationStatus.NoAuth}
            render={() => <MyList films={FILMS}/>}
          />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage film={FILMS[0]} relatedFilms={FILMS.slice(1,5)}/>
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview film={FILMS[0]}/>
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>

      </Switch>
      {/* <HeadGuest/> */}
      {/* <SignInError/> */}
      {/* <SignInMessage/> */}
    </BrowserRouter>
  );
}
