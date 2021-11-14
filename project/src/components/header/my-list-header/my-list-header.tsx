import { AuthorizationStatus } from '../../../const';
import Logo from '../header-components/logo/logo';
import UserBlock from '../header-components/user-block/user-block';

function MyListOption(): JSX.Element {
  return <h1 className="page-title user-page__title">My list</h1>;
}

export default function MyListHeader(): JSX.Element {
  return (
    <header className="page-header user-page__head">
      <Logo/>
      <MyListOption/>
      <UserBlock authorizationStatus={AuthorizationStatus.Auth}/>
    </header>
  );
}
