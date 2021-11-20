import { memo } from 'react';
import ReviewCard from '../review-card/review-card';
import {Comment} from '../../types/types';


function OneColumnReview({review}: {review: Comment}): JSX.Element {

  return (
    <div className="film-card__reviews film-card__row" data-testid='reviews'>
      <ReviewCard review={review}/>
    </div>
  );
}

function TwoColumnsReviews({reviews}: {reviews: Comment[]}): JSX.Element {
  const reviewsCenter = Math.ceil(reviews.length / 2);
  const firstReviewsColumn = reviews.slice(0, reviewsCenter)
    .map((review) => <ReviewCard review={review} key={review.id}/>);
  const secondReviewsColumn = reviews.slice(reviewsCenter)
    .map((review) => <ReviewCard review={review} key={review.id}/>);


  return (
    <div className="film-card__reviews film-card__row" data-testid='reviews'>
      <div className="film-card__reviews-col">

        {firstReviewsColumn}

      </div>
      <div className="film-card__reviews-col">

        {secondReviewsColumn}

      </div>
    </div>
  );
}


function MoviePageReviews({reviews}: {reviews: Comment[]}): JSX.Element {

  if (reviews.length === 1) {
    return <OneColumnReview review={reviews[0]} />;
  }

  if (reviews.length > 1) {
    return <TwoColumnsReviews reviews={reviews}/>;
  }

  const style = { margin: 'auto', color: 'black'};

  return  (
    <div className="film-card__reviews film-card__row" data-testid='reviews'>
      <span style={style}>No Reviews ... </span>
    </div>
  );
}

export default memo(MoviePageReviews, (prev, next) => prev.reviews === next.reviews);
