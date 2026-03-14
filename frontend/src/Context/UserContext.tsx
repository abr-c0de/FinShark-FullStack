import { createContext } from "react";
import type { UserProfile } from "../Models/User";

export type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string,
  ) => Promise<void>;
  loginUser: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  isLoggedIn: () => boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
