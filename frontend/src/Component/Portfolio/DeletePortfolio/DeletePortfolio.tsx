interface Props {
  portfolioValue: string;
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DeletePortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input type="hidden" value={portfolioValue} />
        <button
          type="submit"
          className="
            w-full py-3 text-white bg-red-500 border-2 border-red-500 rounded-lg
            shadow-md hover:shadow-lg hover:bg-white hover:text-red-500
            transition-all duration-300
            font-bold
          "
        >
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
