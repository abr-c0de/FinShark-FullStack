import { Link } from "react-router-dom";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import type { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="flex flex-col w-full p-6 md:w-1/3 space-y-4 text-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      
      {/* Portfolio link */}
      <Link
        to={`/company/${portfolioValue.symbol}/company-profile`}
        className="pt-2 text-xl font-bold text-veryDarkViolet hover:text-darkBlue transition-colors duration-300"
      >
        {portfolioValue.symbol}
      </Link>

      {/* Delete button */}
      <DeletePortfolio
        portfolioValue={portfolioValue.symbol}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
