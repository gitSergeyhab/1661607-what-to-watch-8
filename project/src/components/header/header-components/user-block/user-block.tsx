import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useHistory } from 'react-router';
import { getAvatar } from '../../../../services/auth-info';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../../store/api-action';
import { MouseEvent } from 'react';


function UserAuth(): JSX.Element {

  const history = useHistory();

  const dispatch = useDispatch();

  const avatar = getAvatar();

  const handleAvatarClick = () => history.push(AppRoute.MyList);

  const handleSignOutClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" onClick={handleAvatarClick}>
          <img src={avatar} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a href='/' className="user-block__link" onClick={handleSignOutClick}>Sign out</a>
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

export default function UserBlock({authorizationStatus} : {authorizationStatus: boolean}): JSX.Element{
  return authorizationStatus ? <UserAuth/> : <UserNoAuth/>;
}
