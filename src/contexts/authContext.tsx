"use client";

import { getCurrentUser, userLogin, userRegister } from "@/api/auth";
import { useEffect, useState, useContext, createContext } from "react";
import { getToken, saveToken, removeToken } from "@/helpers/local-storage";
import { IUser } from "@/types/user";

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  signup: (credentials: { username: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginState, setLoginState] = useState(0); // State to trigger useEffect

  useEffect(() => {
    const token = getToken();

    if (token) {
      getCurrentUser().then((data) => {
        setUser({ username: data.username });
        setIsAuthenticated(true);
      }).catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [loginState]); // Depend on loginState

  const login = async ({ username, password }: { username: string; password: string }) => {
    try {
      const data = await userLogin({ username, password });
      saveToken(data.token);
      setUser({ username: data.username });
      setIsAuthenticated(true);
      setLoginState((prev) => prev + 1); // Trigger useEffect
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    setLoginState((prev) => prev + 1); // Trigger useEffect
  };

  const signup = async ({ username, password }: { username: string; password: string }) => {
    try {
      const { data } = await userRegister({ username, password });
      saveToken(data.token);
      setUser({ username: data.username });
      setIsAuthenticated(true);
      setLoginState((prev) => prev + 1); // Trigger useEffect
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
