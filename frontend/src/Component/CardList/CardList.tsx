import type { CompanySearch } from "../../company";
import Card from "../Card/Card";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardList = ({ searchResults, onPortfolioCreate }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Card
            key={result.symbol ?? index} // unique key
            id={index}
            company={result}
            onPortfolioCreate={onPortfolioCreate}
          />
        ))
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center text-gray-500">
          No results found.
        </p>
      )}
    </div>
  );
};


export default CardList;
