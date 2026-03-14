import type { AxiosResponse } from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import type { UserProfileToken } from "../Models/User";
import apiClient from "./AxiosClient";

export const loginAPI = async (
  username: string,
  Password: string,
): Promise<AxiosResponse<UserProfileToken> | null> => {
  try {
    const data = await apiClient.post<UserProfileToken>("account/login", {
      username,
      Password,
    });
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const registerAPI = async (
  userName: string,
  eMail: string,
  Password: string,
): Promise<AxiosResponse<UserProfileToken> | null> => {
  try {
    const data = await apiClient.post<UserProfileToken>("account/register", {
      username: userName,
      email: eMail,
      password: Password,
    });
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
