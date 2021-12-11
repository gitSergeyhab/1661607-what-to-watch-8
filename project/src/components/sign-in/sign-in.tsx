import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

import SignInHeader from '../header/sign-in-header/sign-in-header';
import Spinner from '../spinner/spinner';
import { getAuthVerifiedStatus } from '../../store/user-slice/user-slice-selectors';
import { checkEmail, checkPassword } from '../../util/util';
import { usePostLoginMutation } from '../../services/query-api';
import { saveAvatar, saveToken } from '../../services/auth-info';
import { login, logout } from '../../store/user-slice/user-slice';
import { AppRoute, ErrorMessage } from '../../const';


const AVATAR_URL = 'avatar_url';


const ErrorElement = {
  NoError: <span></span>,
  Email: <div className="sign-in__message"><p>Please enter a valid email address</p></div>,
  Password: <div className="sign-in__message"><p>We can’t recognize this email <br/> and password combination. Please try again.</p></div>,
};


function SignIn({authorizationStatus} : {authorizationStatus: boolean}): JSX.Element {

  const dispatch = useDispatch();
  const isAuthVerified = useSelector(getAuthVerifiedStatus);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [postLogin] = usePostLoginMutation();

  const [error, setError] = useState(ErrorElement.NoError);


  if (authorizationStatus && isAuthVerified) {
    return <Redirect to={AppRoute.Main}/>;
  }

  if (!isAuthVerified) {
    return <Spinner/>;
  }


  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (!checkEmail(email)){
        setError(ErrorElement.Email);
      } else if (!checkPassword(password)) {
        setError(ErrorElement.Password);
      } else {
        try {
          const result = await postLogin({email, password}).unwrap();
          const {token, [AVATAR_URL]: avatar} = result;
          saveToken(token);
          saveAvatar(avatar);
          dispatch(login());
        } catch {
          dispatch(logout());
          toast.error(ErrorMessage.Login);
        }
      }
    }
  };

  return (
    <div className="user-page">
      <SignInHeader/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form"
          onSubmit={handleSubmit}
        >
          {error}
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
