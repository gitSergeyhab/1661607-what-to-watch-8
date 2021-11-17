import { RouteProps, Route, Redirect } from 'react-router-dom';
import {AppRoute} from '../../const';


type PrivateRouteProps = RouteProps & {
  privateComponent: JSX.Element,
  authorizationStatus: boolean
}

function PrivateRoute(privateRouteProps: PrivateRouteProps): JSX.Element {

  const {exact, path, privateComponent, authorizationStatus} = privateRouteProps;

  return (
    <Route exact={exact} path={path}>
      {authorizationStatus ? privateComponent : <Redirect to={AppRoute.SignIn}/>}
    </Route>
  );
}

export default PrivateRoute;
