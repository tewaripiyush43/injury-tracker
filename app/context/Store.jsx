"use client";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData({
      id: user.sid,
      email: user.email,
      nickname: user.nickname,
    });

    console.log("User logged in", userData);
  };

  const logout = () => {
    setUserData(null);
  };

  return (
    <StoreContext.Provider value={{ userData, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};
