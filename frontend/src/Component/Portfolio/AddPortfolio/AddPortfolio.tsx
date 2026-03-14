interface Props {
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <form onSubmit={onPortfolioCreate} className="flex items-center space-x-2">
        
        {/* Hidden input for symbol */}
        <input readOnly hidden value={symbol} />

        {/* Button */}
        <button
          type="submit"
          className="
            px-6 py-2 font-semibold text-white
            bg-blue-600
            rounded-lg shadow-md
            hover:bg-blue-700 hover:shadow-lg hover:scale-105
            transition-all duration-300
            focus:outline-none
          "
        >
          Add
        </button>

      </form>
    </div>
  );
};

export default AddPortfolio;
