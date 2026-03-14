import type { PortfolioGet } from "../../../Models/Portfolio";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio" className="py-10">
      {/* Title */}
      <h2 className="mb-6 text-3xl font-bold text-center md:text-4xl text-veryDarkViolet">
        My Portfolio
      </h2>

      {/* Portfolio cards grid */}
      {portfolioValues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {portfolioValues.map((portfolioValue, index) => (
            <CardPortfolio
              key={portfolioValue.symbol ?? index} // use value if available for stable key
              portfolioValue={portfolioValue}
              onPortfolioDelete={onPortfolioDelete}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-xl font-semibold text-center text-gray-500 mt-6">
          Your portfolio is empty.
        </h3>
      )}
    </section>
  );
};


export default ListPortfolio;
