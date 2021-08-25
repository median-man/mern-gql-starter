import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
