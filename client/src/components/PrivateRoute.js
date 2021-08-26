// This component is based upon the Redirects (Auth) example in the React Router
// docs. (https://reactrouter.com/web/example/auth-workflow)

import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../util/auth";

export default function PrivateRoute({ children, ...routeProps }) {
  const { isLoggedIn } = useAuth();
  const render = ({ location }) => {
    if (isLoggedIn) {
      return children;
    }
    // Add protected route to location state to enable returning to the same
    // route after login
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  };
  return <Route {...routeProps} render={render} />;
}
