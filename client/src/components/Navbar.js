import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <NavLink exact to="/" className="navbar-link">
        Home
      </NavLink>
      {isLoggedIn ? (
        <button className="navbar-link" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
}
