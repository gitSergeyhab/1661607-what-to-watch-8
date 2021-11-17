import { FormEvent } from 'react';


type TextareaProps = {onChange: (evt: FormEvent<HTMLTextAreaElement>) => void, comment: string, disabled: boolean}

function CommentFormTextarea({onChange, comment, disabled} : TextareaProps): JSX.Element {

  return (
    <textarea
      disabled={disabled}
      onChange={onChange}
      value={comment}
      className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
    >
    </textarea>
  );
}

export default CommentFormTextarea;
