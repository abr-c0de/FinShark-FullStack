import { Outlet } from "react-router-dom";


interface Props {
  children?: React.ReactNode;
  ticker: string;
};

const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="md:ml-64 min-h-screen bg-blueGray-50 flex flex-col">

      {/* Header */}
      <div className="pt-20 pb-24 bg-linear-to-r from-lightBlue-400 to-lightBlue-600 shadow-md shrink-0" />

      {/* Main content */}
      <div className="flex-1 px-4 md:px-6 mx-auto w-full flex flex-col gap-6">

        {/* 🔹 Tiles / cards row */}
        <div className="-mt-24 relative z-10 flex flex-wrap">
          {children}
        </div>

        {/* 🔹 Full-page table */}
        <div className="flex-1 overflow-auto bg-white rounded-lg shadow-lg p-4">
          <Outlet context={ticker} />
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;
