import { memo } from 'react';
import Logo from '../header-components/logo/logo';
import UserBlock from '../header-components/user-block/user-block';

function MainHeader({authorizationStatus} : {authorizationStatus: boolean}): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo/>
      <UserBlock authorizationStatus={authorizationStatus} />
    </header>
  );
}

export default memo(MainHeader) ;
