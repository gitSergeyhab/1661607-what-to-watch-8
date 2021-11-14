import { RouteProps, Route, Redirect } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';


type PrivateRouteProps = RouteProps & {
  myList: JSX.Element,
  authorizationStatus: AuthorizationStatus
}

function PrivateRoute(privateRouteProps: PrivateRouteProps): JSX.Element {

  const {exact, path, myList, authorizationStatus} = privateRouteProps;

  return (
    <Route exact={exact} path={path}>
      {authorizationStatus === AuthorizationStatus.Auth ? myList : <Redirect to={AppRoute.SignIn}/>}
    </Route>
  );
}

export default PrivateRoute;
