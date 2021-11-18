/* eslint-disable no-console */

import { MouseEvent } from 'react';
import { useHistory } from 'react-router';


const Path = {AddReview: 'review', Films: '/films'};


function BtnAddReview({id}: {id: string}): JSX.Element {

  const history = useHistory();
  const addReviewPath = `${Path.Films}/${id}/${Path.AddReview}`;

  const handleAddReviewClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    history.push(addReviewPath);
  };

  return <a href='/' onClick={handleAddReviewClick} className="btn film-card__button">Add review</a>;
}

export default BtnAddReview;
