import { createContext, useContext, useEffect, useState } from "react";

const saveToken = (token) => localStorage.setItem("token", token);

export const findToken = () => localStorage.getItem("token") || "";

const authCtx = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(findToken);

  useEffect(() => {
    saveToken(token);
  }, [token]);

  const login = (token) => setToken(token);
  const logout = () => setToken("");

  // TODO: use decoded token to get login status
  const isLoggedIn = Boolean(token);

  const auth = {
    isLoggedIn,
    login,
    logout,
  };
  return <authCtx.Provider value={auth}>{children}</authCtx.Provider>;
};

export const useAuth = () => useContext(authCtx);
