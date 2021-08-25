import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  // TODO: initialize login state from auth token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => setIsLoggedIn(false);
  const setToken = async (token) => {
    // TODO: save auth token in local storage
    setIsLoggedIn(Boolean(token));
  };
  const auth = { isLoggedIn, logout, setToken };
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />
      <Switch>
        <Route exact path="/">
          <Home auth={auth} />
        </Route>
        <Route path="/login">
          <Login auth={auth} />
        </Route>
        <Route path="/signup">
          <SignUp auth={auth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
