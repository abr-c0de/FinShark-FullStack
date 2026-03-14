import axios from "axios";
import type {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyCompData,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  // CompanyTenK,
} from "./company";

export const SearchCompanies = async (query: string) => {
  try {
    const data = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response?.data;
    } else {
      console.log(error);
      return error;
    }
  }
};

export const GetCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

export const GetKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

export const GetIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

export const GetBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

export const GetCashFlowStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

export const GetCompsData = async (query: string) => {
  try {
    const data = await axios.get<CompanyCompData[]>(
      `https://financialmodelingprep.com/stable/stock-peers?symbol=${query}&apikey=${import.meta.env.VITE_API_KEY}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message from axios:", error.response?.data);
      return error.response?.data;
    } else {
      console.log("Error message:", error);
      return error;
    }
  }
};

// export const GetTenK = async (query: string) => {
//   try {
//     const data = await axios.get<CompanyTenK[]>(
//       `https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${query}&from=2024-01-01&to=2024-03-01&page=0&limit=0&apikey=${import.meta.env.VITE_API_KEY}`,
//     );
//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Error message from axios:", error.response?.data);
//       return error.response?.data;
//     } else {
//       console.log("Error message:", error);
//       return error;
//     }
//   }
// };
