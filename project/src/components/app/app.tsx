import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddReview from '../../components/add-review/add-review';
import Main from '../../components/main/main';
import MoviePage from '../../components/movie-page/movie-page';
import MyList from '../../components/my-list/my-list';
import NotFoundPage from '../not-found-page/not-found-page';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../../components/sign-in/sign-in';
import { getAuthStatus } from '../../store/user-data/user-data-selectors';
import { AppRoute } from '../../const';


function App(): JSX.Element {

  const authorizationStatus = useSelector(getAuthStatus);

  return (
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
        <Player/>
      </Route>
      <Route>
        <NotFoundPage authorizationStatus={authorizationStatus}/>
      </Route>

    </Switch>
  );
}

export default App;
