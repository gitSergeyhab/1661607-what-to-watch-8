import { MouseEventHandler } from 'react';

export default function BtnShowMore({onClick} : {onClick: MouseEventHandler}): JSX.Element {

  return(
    <button
      onClick={onClick}
      className="catalog__button" type="button"
    >
              Show more
    </button>
  );
}
