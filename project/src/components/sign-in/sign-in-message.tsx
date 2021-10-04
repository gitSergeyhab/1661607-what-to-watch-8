import SignInProto from './sign-in-proto';

function Message() {
  return (
    <div className="sign-in__message">
      <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
    </div>
  );
}

const message = <Message/>;

function SignInMessage(): JSX.Element {
  return <SignInProto optionalBlock={message}/>;
}

export default SignInMessage;
