import { AuthorizationStatus } from '../../../const';
import Logo from '../header-components/logo/logo';
import UserBlock from '../header-components/user-block/user-block';

export default function MainHeader({authorizationStatus} : {authorizationStatus: AuthorizationStatus}): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo/>
      <UserBlock authorizationStatus={authorizationStatus} />
    </header>
  );
}
