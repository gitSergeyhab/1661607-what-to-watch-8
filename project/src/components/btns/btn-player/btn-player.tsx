/* eslint-disable no-console */

import {  useHistory} from 'react-router-dom';


const PATH_PLAYER = '/player/';


function BtnPlayer({ id}: {id: number}): JSX.Element {

  const history = useHistory();

  const handleBtnClick = () => history.push(`${PATH_PLAYER}${id}`);


  return (
    <button className="btn btn--play film-card__button" type="button"
      onClick={handleBtnClick}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default BtnPlayer;
