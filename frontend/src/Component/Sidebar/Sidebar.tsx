import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
        transform md:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out
      "
    >
      {/* Mobile toggle button */}
      <button
        className="
          md:hidden absolute top-1/2 -right-10 w-10 h-10 flex items-center justify-center
          bg-white rounded-r-lg shadow-md text-blueGray-700 border border-blueGray-200
          focus:outline-none hover:bg-gray-100 transition-all duration-200
        "
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>

      <div className="flex flex-col h-full px-4 py-6 overflow-y-auto">
        {/* Sidebar menu */}
        <div className="flex flex-col space-y-4 mt-4">
          <Link
            to="company-profile"
            className="
              flex items-center text-slate-600 font-semibold uppercase
              p-3 rounded-lg hover:bg-lightBlue-100 hover:text-darkBlue transition-all duration-300
            "
          >
            <FaHome />
            <span className="ml-3 text-base md:text-sm">Company Profile</span>
          </Link>

          <Link
            to="income-statement"
            className="
              flex items-center text-slate-600 font-semibold uppercase
              p-3 rounded-lg hover:bg-lightBlue-100 hover:text-darkBlue transition-all duration-300
            "
          >
            <FaHome />
            <span className="ml-3 text-base md:text-sm">Income Statement</span>
          </Link>

          <Link
            to="balance-sheet"
            className="
              flex items-center text-slate-600 font-semibold uppercase
              p-3 rounded-lg hover:bg-lightBlue-100 hover:text-darkBlue transition-all duration-300
            "
          >
            <FaHome />
            <span className="ml-3 text-base md:text-sm">Balance Sheet</span>
          </Link>

          <Link
            to="cashflow-statement"
            className="
              flex items-center text-slate-600 font-semibold uppercase
              p-3 rounded-lg hover:bg-lightBlue-100 hover:text-darkBlue transition-all duration-300
            "
          >
            <FaHome />
            <span className="ml-3 text-base md:text-sm">Cash Flow Statement</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

