"use client";

import { getCurrentUser, userLogin, userRegister } from "@/api/auth";
import { useEffect, useState } from "react";
import { getToken, saveToken } from "../helpers/local-storage";
import { IUser } from "@/types/user";

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    console.log(token);

    if (token) {
      setIsAuthenticated(true);
      getCurrentUser().then((data) => {
        setUser(data);
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const data = await userLogin({ username, password });
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await userRegister({ username, password });
      console.log(data);
      setUser(data.user);
      saveToken(data.token);
      // setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return { user, isAuthenticated, logout, login, signup };
};

export default useAuth;
