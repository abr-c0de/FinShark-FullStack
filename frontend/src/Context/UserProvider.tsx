import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserProfile } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import type React from "react";

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const registerUser = async (
    email: string,
    username: string,
    password: string,
  ) => {
    try {
      const res = await registerAPI(username, email, password);

      if (!res) {
        toast.error("Server error occurred");
        return;
      }

      const userObj = {
        username: res.data.username,
        email: res.data.email,
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userObj));

      setToken(res.data.token);
      setUser(userObj);

      toast.success("Registration successful!");
      navigate("/SearchPage");
    } catch {
      toast.error("Server error occurred");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);

      if (!res) {
        toast.error("Server error occurred");
        return;
      }

      // console.log(res.data);

      const userObj = {
        username: res.data.username,
        email: res.data.email,
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userObj));

      setToken(res.data.token);
      setUser(userObj);

      toast.success("Login successful!");
      navigate("/SearchPage");
    } catch {
      toast.error("Server error occurred");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    navigate("/");
  };

  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider
      value={{ user, token, loginUser, registerUser, logOut, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
