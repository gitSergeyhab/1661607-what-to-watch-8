import { AuthorizationStatus } from '../../../const';
import Logo from '../header-components/logo/logo';
import UserBlock from '../header-components/user-block/user-block';

export default function GuestHeader({authorizationStatus} : {authorizationStatus: AuthorizationStatus}): JSX.Element {
  return (
    <header className="page-header">
      <Logo/>
      <UserBlock authorizationStatus={authorizationStatus}/>
    </header>
  );
}
