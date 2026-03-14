import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Component/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Component/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Component/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Component/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "LoginPage", element: <LoginPage /> },
      { path: "RegisterPage", element: <RegisterPage/>},
      { path: "SearchPage", element: <ProtectedRoute> <SearchPage /></ProtectedRoute> },
      { path: "DesignPage", element: <DesignPage /> },
      { path: "Company/:ticker",
        element: <ProtectedRoute><CompanyPage /></ProtectedRoute> ,
        children: [
          {path: "company-profile", element: <CompanyProfile />},
          {path: "income-statement", element: <IncomeStatement />},
          {path: "balance-sheet", element: <BalanceSheet />},
          {path: "cashflow-statement", element: <CashFlowStatement/>}
        ]},
      
    ],
  },
]);
