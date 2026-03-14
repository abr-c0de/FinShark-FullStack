import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CompanyProfile } from "../../company";
import { GetCompanyProfile } from "../../api";
import Sidebar from "../../Component/Sidebar/Sidebar";
import CompanyDashboard from "../../Component/CompanyDashboard/CompanyDashboard";
import Tile from "../../Component/Tile/Tile";
import CompFinder from "../../Component/CompFinder/CompFinder";
// import TenKFinder from "../../Component/TenKFinder/TenKFinder";

const CompanyPage = () => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProfileInit = async () => {
      try {
        const result = await GetCompanyProfile(ticker!);
        setCompany(result[0]);

        console.log("API RESULT:", result);
      } catch (error) {
        console.error(error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      getProfileInit();
    }
  }, [ticker]);

  return (
    <div className="min-h-screen bg-blueGray-50">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
          Loading...
        </div>
      ) : company ? (
        <div className="w-full relative flex overflow-x-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Dashboard */}
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" info={company.companyName} />
            <Tile title="Company Sector" info={company.sector} />
            <Tile title="Price" info={"$" + company.price.toString()} />
            <Tile title="Company Country" info={company.country} />
            <Tile title="Company State" info={company.state} />
            <Tile title="CEO" info={company.ceo} />

            <div className="mt-6 w-full">
              <CompFinder ticker={company.symbol} />
            </div>

            <div className="mt-6 bg-white shadow-lg rounded-lg p-6 text-gray-800 text-md leading-relaxed w-full">
              {company.description}
            </div>
          </CompanyDashboard>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-500">
          Company Not Found
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
