import { useOutletContext } from "react-router-dom";
import type { CompanyCashFlow } from "../../company";
import { useEffect, useState } from "react";
import { GetCashFlowStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = () => {
  const ticker = useOutletContext<string>();
  const [cashflowData, setCashflowData] = useState<CompanyCashFlow[]>([]);

  useEffect(() => {
    const fetchCashFlowData = async () => {
      const result = await GetCashFlowStatement(ticker);
      setCashflowData(result!.data);
    };

    fetchCashFlowData();
  }, [ticker]);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {cashflowData ? (
        <section className="bg-white shadow-lg rounded-lg p-6 animate-fadeIn">
          {/* Section header */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Cashflow Statement
          </h2>

          {/* Table wrapper for styling */}
          <div className="rounded-lg overflow-hidden">
            <Table
              config={config}
              data={cashflowData}
              getRowKey={(row) => row.cik}
            />
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

export default CashFlowStatement;
