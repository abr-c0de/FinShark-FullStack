import type { CompanyIncomeStatement } from "../../company";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      // Manually calculate: Net Income / Revenue
      formatRatio(company.netIncome / company.revenue),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      // Fixed casing: epsdiluted -> epsDiluted
      formatRatio(company.epsDiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      // Manually calculate: Gross Profit / Revenue
      formatRatio(company.grossProfit / company.revenue),
  },
  {
    label: "Operating Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      // Manually calculate: Operating Income / Revenue
      formatRatio(company.operatingIncome / company.revenue),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      // Manually calculate: Income Before Tax / Revenue
      formatRatio(company.incomeBeforeTax / company.revenue),
  },
];

const IncomeStatement = () => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<
    CompanyIncomeStatement[]
  >([]);
  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await GetIncomeStatement(ticker);
      setIncomeStatement(result!.data);
    };
    incomeStatementFetch();
  }, [ticker]);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {incomeStatement ? (
        <section className="bg-white shadow-lg rounded-lg p-6 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Income Statement
          </h2>

          {/* Table wrapper for styling */}
          <div className="rounded-lg overflow-hidden">
            <Table
              config={configs}
              data={incomeStatement}
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

export default IncomeStatement;
