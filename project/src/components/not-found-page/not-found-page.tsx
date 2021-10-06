import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {MainHeader} from '../header/header';

function NotFoundPage(): JSX.Element {

  return (
    <div className="player" style={{backgroundColor: 'black'}}>
      <h1 className="visually-hidden">WTW</h1>

      <MainHeader/>

      <div style={{textAlign: 'center', color: 'orange'}}>
        <h2>
            Error 404
          <br/>
            Page Not Found
        </h2>
        <h3>
          <Link style={{color: 'orange'}} to={AppRoute.Main}>
              Mane Page
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default NotFoundPage;
