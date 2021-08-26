import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            {/* Use PrivateRoute for pages that should only be accessible to a
            user that has logged in.*/}
            <PrivateRoute path="/protected">
              <ProtectedPageExample />
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
