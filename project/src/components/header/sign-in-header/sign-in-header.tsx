import Logo from '../header-components/logo/logo';


function SignIn(): JSX.Element {
  return <h1 className="page-title user-page__title">Sign in</h1>;
}

export default function SignInHeader(): JSX.Element {
  return (
    <header className="page-header user-page__head">
      <Logo/>
      <SignIn/>
    </header>
  );
}
