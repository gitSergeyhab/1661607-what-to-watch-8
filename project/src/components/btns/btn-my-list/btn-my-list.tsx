import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { postFilmStatusAction } from '../../../store/api-actions';
import { AppRoute, BtnLocation } from '../../../const';


const LinkHref = {
  InList: '#in-list',
  Add: '#add',
};

type MyBtnProps = {authorizationStatus: boolean, id: number, isFavorite: boolean, location: BtnLocation}

function BtnMyList({authorizationStatus, id, isFavorite, location}: MyBtnProps): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();


  const handleBtnClick = () => {
    if (authorizationStatus) {
      const status = isFavorite ? 0 : 1;
      dispatch(postFilmStatusAction({id, status, location}));
    } else {
      history.push(AppRoute.SignIn);
    }
  };

  const linkHref = isFavorite ? LinkHref.InList : LinkHref.Add;

  return (
    <button className="btn btn--list film-card__button" type="button"
      onClick={handleBtnClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={linkHref}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}

export default BtnMyList;
