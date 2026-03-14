import { Link } from "react-router-dom";
import type { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface Props {
  id: number;
  company: CompanySearch;
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Card = ({ id, company, onPortfolioCreate }: Props) => {
  return (
    <div
      className="
        flex flex-col items-center justify-between w-full p-6 
        bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300
        md:flex-row md:space-x-6
      "
      id={id.toString()}
    >
      {/* Company Name & Symbol */}
      <Link
        to={`/Company/${company.symbol}/company-profile`}
        className="font-bold text-center text-veryDarkViolet md:text-left text-lg hover:text-darkBlue transition-colors duration-300"
      >
        {company.name} ({company.symbol})
      </Link>

      {/* Currency */}
      <p className="text-gray-700 font-medium">{company.currency}</p>

      {/* Exchange */}
      <p className="font-semibold text-gray-800">
        {company.exchangeFullName} - {company.exchange}
      </p>

      {/* Add to Portfolio button */}
      <div className="mt-4 md:mt-0">
        <AddPortfolio
          onPortfolioCreate={onPortfolioCreate} // pass only the required single argument
          symbol={company.symbol} // AddPortfolio already has symbol
        />
      </div>
    </div>
  );
};

export default Card;
