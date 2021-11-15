import { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { AppRoute } from '../../const';
import { loginAction } from '../../store/api-action';
import SignInHeader from '../header/sign-in-header/sign-in-header';

// const errorMessage = <div className="sign-in__message"><p>Please enter a valid email address</p></div>;
// const message = <div className="sign-in__message"><p>We can’t recognize this email <br/> and password combination. Please try again.</p></div>;

function SignIn({authorizationStatus} : {authorizationStatus: boolean}): JSX.Element {

  const dispatch = useDispatch();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const infoBlock = null;

  if (authorizationStatus) {
    return <Redirect to={AppRoute.Main}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      dispatch(loginAction({email, password}));
    }
  };

  return (
    <div className="user-page">
      <SignInHeader/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form"
          onSubmit={handleSubmit}
        >
          {infoBlock}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                ref={emailRef}
                defaultValue=''
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                ref={passwordRef}
                defaultValue=''
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
