import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(localStorage.user);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
