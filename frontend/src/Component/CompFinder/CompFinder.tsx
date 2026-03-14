import { useEffect, useState } from "react";
import type { CompanyCompData } from "../../company";
import { GetCompsData } from "../../api";
import CompFinderItem from "./CompFinderItem";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData[]>([]);
  useEffect(() => {
    const GetComps = async () => {
      const value = await GetCompsData(ticker);
      setCompanyData(value?.data);
    };
    GetComps();
  }, [ticker]);
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Related Companies
      </h3>
      <div className="flex flex-wrap gap-4">
        {companyData.map((company, index) => (
          <CompFinderItem
            symbol={company.symbol}
            key={company.symbol || index}
          />
        ))}
      </div>
    </div>
  );
};

export default CompFinder;
