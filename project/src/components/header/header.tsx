import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


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

function AddReviewOption(): JSX.Element{
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="film-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={AppRoute.AddReview}>Add review</Link>
        </li>
      </ul>
    </nav>
  );
}


function MainHeader(): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo/>
      <SignOut/>
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

function AddReviewHeader(): JSX.Element {
  return (
    <header className="page-header">
      <Logo/>
      <AddReviewOption/>
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
