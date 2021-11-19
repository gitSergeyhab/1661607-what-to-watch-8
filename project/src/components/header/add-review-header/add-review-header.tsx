import { Link } from 'react-router-dom';

import Logo from '../header-components/logo/logo';
import UserBlock from '../header-components/user-block/user-block';
import { Film } from '../../../types/types';


function Breadcrumbs({film}: {film: Film}): JSX.Element{
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link" >Add review</span>
        </li>
      </ul>
    </nav>
  );
}

export default function AddReviewHeader({film, authorizationStatus}: {film: Film, authorizationStatus: boolean}): JSX.Element {
  return (
    <header className="page-header">
      <Logo/>
      <Breadcrumbs film={film}/>
      <UserBlock authorizationStatus={authorizationStatus}/>
    </header>
  );
}
