import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN } from "../util/mutations";
import { createContext, useContext, useEffect, useState } from "react";
import decode from "jwt-decode";

export const token = {
  _token: "",
  _payload: null,
  init() {
    token._token = token.get();
    token.decode();
  },
  decode() {
    token._payload = token._token ? decode(token._token) : null;
  },
  set(value) {
    token._token = value;
    token.decode();
    if (value) {
      localStorage.setItem("token", value);
      return;
    }
    localStorage.removeItem("token");
  },
  get() {
    return localStorage.getItem("token") || "";
  },
  expired() {
    const exp = token._payload?.exp;
    if (!exp) {
      return true;
    }
    return exp < Date.now() / 1000;
  },
  data() {
    return token._payload?.data;
  },
};

token.init();

const authCtx = createContext({
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => token.get());
  const [isLoggedIn, setIsLoggedIn] = useState(!token.expired());
  const [error, setError] = useState(null);
  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN);
  const [createUser, { loading: signupLoading }] = useMutation(CREATE_USER);

  const loading = loginLoading || signupLoading;
  const user = token.data();

  useEffect(() => {
    token.set(authToken);
    setIsLoggedIn(!token.expired());
  }, [authToken]);

  const login = async ({ email, password }) => {
    try {
      // TODO: implement improved validation.
      if (!email || !password) {
        // TODO: implement improved error message.
        throw new Error("Auth error. Invalid parameter received.");
      }
      const { data } = await loginUser({ variables: { email, password } });
      setAuthToken(data.login.token);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setAuthToken("");
    }
  };

  const signup = async ({ email, password, username }) => {
    try {
      // TODO: implement improved validation.
      if (!email || !password || !username) {
        // TODO: implement improved error message
        throw new Error("Auth error. Invalid parameter received.");
      }

      const { data } = await createUser({
        variables: { email, password, username },
      });
      setAuthToken(data.createUser.token);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const logout = () => setAuthToken("");

  const auth = {
    isLoggedIn,
    user,
    loading,
    error,
    login,
    logout,
    signup,
  };
  return <authCtx.Provider value={auth}>{children}</authCtx.Provider>;
};

export const useAuth = () => useContext(authCtx);
