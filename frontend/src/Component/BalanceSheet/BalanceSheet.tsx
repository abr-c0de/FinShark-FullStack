import { useEffect, useState } from "react";
import type { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import { GetBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinners/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

const config = [
  {
    id: "totalAssets",
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    id: "currentAssets",
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    id: "cash",
    label: "Cash & Cash Equivalents",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    id: "ppe",
    label: "Property, Plant & Equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    id: "intangibles",
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    id: "totalLiabilities",
    label: "Total Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    id: "currentLiabilities",
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    id: "longTermDebt",
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    id: "totalDebt",
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalDebt),
  },
  {
    id: "equity",
    label: "Shareholders’ Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    id: "retainedEarnings",
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
  },
];

const BalanceSheet = () => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      const value = await GetBalanceSheet(ticker);
      setBalanceSheet(value?.data[0]);
    };

    fetchBalanceSheet();
  }, [ticker]);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {balanceSheet ? (
        <section className="bg-white shadow-lg rounded-lg p-6 animate-fadeIn">
          {/* Section header */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Balance Sheet
          </h2>

          {/* RatioList wrapper */}
          <div className="rounded-lg overflow-hidden">
            <RatioList data={balanceSheet} config={config} />
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
