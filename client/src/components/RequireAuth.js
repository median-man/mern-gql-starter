import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../util/auth";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (isLoggedIn) {
    return children;
  }
  // Redirect to /login page but save location user was trying to go to so that
  // user can be returned to this place after logging in for a nicer user
  // experience.
  return <Navigate to="/login" state={{ from: location }} replace />;
}
