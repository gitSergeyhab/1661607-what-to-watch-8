import { useHistory } from 'react-router-dom';
import { AppRoute, BtnLocation, ErrorMessage } from '../../../const';
import { usePostStatusMutation } from '../../../services/query-api';
import { toast } from 'react-toastify';


const LinkHref = {
  InList: '#in-list',
  Add: '#add',
};

type MyBtnProps = {authorizationStatus: boolean, id: number, isFavorite: boolean, location: BtnLocation}

function BtnMyList({authorizationStatus, id, isFavorite, location}: MyBtnProps): JSX.Element {

  const history = useHistory();

  const [changeStatus] = usePostStatusMutation();

  const handleBtnClick = async() => {
    if (authorizationStatus) {
      const status = isFavorite ? 0 : 1;
      try {
        await changeStatus({id, status}).unwrap();
      } catch {
        toast.error(ErrorMessage.PostFavorite);
      }
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
