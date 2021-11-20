import { Comment } from '../../types/types';
import { getReviewDateFormat } from '../../util/util';


function ReviewCard({review}: {review: Comment}): JSX.Element {

  const {user, rating, comment, date} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24"> {getReviewDateFormat(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default ReviewCard;


