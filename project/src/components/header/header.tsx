import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Film } from '../../types/types';


function Logo(): JSX.Element {
  return (
    <div className="logo">
      <Link className="logo__link" to={AppRoute.Main}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

function SignOut(): JSX.Element {
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link" to={AppRoute.SignIn}>Sign out</Link>
      </li>
    </ul>
  );
}

function SignIn(): JSX.Element {
  return <h1 className="page-title user-page__title">Sign in</h1>;
}

function GuestOption(): JSX.Element {
  return (
    <div className="user-block">
      <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
    </div>
  );
}

function MyListOption(): JSX.Element {
  return <h1 className="page-title user-page__title">My list</h1>;
}

function AddReviewOption({film}: {film: Film}): JSX.Element{
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" >Add review</a>
        </li>
      </ul>
    </nav>
  );
}


function MainHeader({authorizationStatus} : {authorizationStatus: AuthorizationStatus}): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo/>
      {authorizationStatus === AuthorizationStatus.Auth ? <SignOut/> : <GuestOption/> }
    </header>
  );
}

function MyListHeader(): JSX.Element {
  return (
    <header className="page-header user-page__head">
      <Logo/>
      <MyListOption/>
      <SignOut/>
    </header>
  );
}

function GuestHeader(): JSX.Element {
  return (
    <header className="page-header">
      <Logo/>
      <GuestOption/>
    </header>
  );
}

function AddReviewHeader({film}: {film: Film}): JSX.Element {
  return (
    <header className="page-header">
      <Logo/>
      <AddReviewOption film={film}/>
      <SignOut/>
    </header>
  );
}

function SignInHeader(): JSX.Element {
  return (
    <header className="page-header user-page__head">
      <Logo/>
      <SignIn/>
    </header>
  );
}

export {
  MainHeader,
  MyListHeader,
  GuestHeader,
  AddReviewHeader,
  SignInHeader
};
