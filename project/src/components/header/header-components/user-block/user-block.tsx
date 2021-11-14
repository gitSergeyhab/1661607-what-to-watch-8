import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../../const';
import { useHistory } from 'react-router';


function UserAuth(): JSX.Element {

  const history = useHistory();

  const handleAvatarClick = () => history.push(AppRoute.MyList);

  const handleSignOutClick = () => history.push(AppRoute.Main);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" onClick={handleAvatarClick}>
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" onClick={handleSignOutClick} to={AppRoute.Main}>Sign out</Link>
      </li>
    </ul>
  );
}

function UserNoAuth(): JSX.Element {
  return (
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default function UserBlock({authorizationStatus} : {authorizationStatus: AuthorizationStatus}): JSX.Element{
  return authorizationStatus === AuthorizationStatus.Auth ? <UserAuth/> : <UserNoAuth/>;
}
