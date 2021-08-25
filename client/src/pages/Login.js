import { Redirect } from "react-router-dom";

export default function Login({ auth }) {
  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <hr />
      {/* TODO: implement login form */}
    </div>
  );
}
