import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MyList from '../../components/my-list/my-list';
import Main from '../../components/main/main';
import AddReview from '../../components/add-review/add-review';
import MoviePage from '../../components/movie-page/movie-page';
import SignIn from '../../components/sign-in/sign-in';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';


/* eslint-disable no-console */


import {AppRoute} from '../../const';
import { useSelector } from 'react-redux';
import { getFilms } from '../../store/main-data/main-data-selectors';
import { getAuthStatus } from '../../store/user-data/user-data-selectors';


function App(): JSX.Element {

  const authorizationStatus = useSelector(getAuthStatus);
  const films = useSelector(getFilms);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main authorizationStatus={authorizationStatus}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn authorizationStatus={authorizationStatus}/>
        </Route>
        <Route exact path={AppRoute.MyList}>

          <PrivateRoute
            exact
            path={AppRoute.MyList}
            authorizationStatus={authorizationStatus}
            privateComponent={<MyList/>}
          />
        </Route>
        <Route exact path={AppRoute.AddReview}>

          <PrivateRoute
            exact
            path={AppRoute.AddReview}
            authorizationStatus={authorizationStatus}
            privateComponent={<AddReview authorizationStatus={authorizationStatus}/>}
          />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage authorizationStatus={authorizationStatus}/>
        </Route>

        <Route exact path={AppRoute.Player}>
          <Player films={films} authorizationStatus={authorizationStatus}/>
        </Route>
        <Route>
          <NotFoundPage authorizationStatus={authorizationStatus}/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
