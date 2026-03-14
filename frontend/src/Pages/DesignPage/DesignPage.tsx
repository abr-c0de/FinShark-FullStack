import RatioList from "../../Component/RatioList/RatioList";
import Table from "../../Component/Table/Table";
import { testIncomeStatementData } from "../../Component/Table/testData";
import type { IncomeStatement } from "../../Component/Table/testData";

type TableConfig<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
  subTitle?: string;
};

const tableConfig: TableConfig<IncomeStatement>[] = [
  {
    label: "Company Name",
    render: (company) => company.symbol,
    subTitle: "This is the company name.",
  },
];

const DesignPage = () => {
  return (
    <div>
      <h1>Finance App Design Page</h1>
      <p>This is the design page of this app</p>

      <RatioList data={testIncomeStatementData[0]} config={tableConfig} />

      <Table
        data={testIncomeStatementData}
        config={tableConfig}
        getRowKey={(row) => row.cik ?? row.symbol}
      />
    </div>
  );
};

export default DesignPage;