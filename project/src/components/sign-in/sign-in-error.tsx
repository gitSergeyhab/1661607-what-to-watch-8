import SignInProto from './sign-in-proto';


function MessageError() {
  return (
    <div className="sign-in__message">
      <p>Please enter a valid email address</p>
    </div>
  );
}

const message = <MessageError/>;

function SignInError(): JSX.Element {
  return <SignInProto optionalBlock={message}/>;
}


export default SignInError;
