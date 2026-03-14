import { handleError } from "../Helpers/ErrorHandler";
import type { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import apiClient from "./AxiosClient";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const response = await apiClient.post<PortfolioPost>("portfolios", {
     symbol,
    });

    return response;
  } catch (error) {
    handleError(error);
    return null;
  }
};
export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await apiClient.delete<PortfolioPost>(
      `portfolios/?symbol=${symbol}`,
    );
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const portfolioGetAPI = async () => {
  try {
    const data = await apiClient.get<PortfolioGet[]>(`portfolios`);
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
