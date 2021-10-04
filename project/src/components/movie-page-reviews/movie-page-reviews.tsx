import {Comment} from '../../types/types';
import ReviewCard from '../review-card/review-card';


function OneColumnReview({review}: {review: Comment}): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        <ReviewCard review={review}/>

      </div>
    </div>
  );
}

function TwoColumnsReviews({reviews}: {reviews: Comment[]}): JSX.Element {
  const reviewsCenter = Math.ceil(reviews.length / 2);
  const firstReviews = reviews.slice(0, reviewsCenter);
  const secondReviews = reviews.slice(reviewsCenter);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {firstReviews.map((review) => <ReviewCard review={review} key={review.id}/>)}

      </div>
      <div className="film-card__reviews-col">

        {secondReviews.map((review) => <ReviewCard review={review} key={review.id}/>)}

      </div>
    </div>
  );
}

function MoviePageReviews({reviews}: {reviews: Comment[]}): JSX.Element {

  if (reviews.length === 1) {
    return <OneColumnReview review={reviews[0]} />;
  }

  if (reviews.length > 1) {
    return <TwoColumnsReviews reviews={reviews} />;
  }

  return <span></span>;
}

export default MoviePageReviews;
