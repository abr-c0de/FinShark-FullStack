interface Props {
  onSearchSubmit: (e: React.SyntheticEvent) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string | undefined;
}

const Search = ({ onSearchSubmit, handleSearchChange, search }: Props) => {
  return (
    <section className="relative bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-6">
        <form
          onSubmit={onSearchSubmit}
          className="
            relative flex flex-col w-full p-6 md:p-4 space-y-4 
            bg-linear-to-r from-lightBlue-400 to-darkBlue-500 
            rounded-xl shadow-lg md:flex-row md:space-y-0 md:space-x-3
          "
        >
          <input
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
            className="
              flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg 
              placeholder-black bg-white focus:outline-none focus:ring-2 
              focus:ring-lightBlue-300 focus:border-lightBlue-400 transition-all duration-300
            "
          />
          <button
            type="submit"
            className="
              px-6 py-3 font-semibold text-white rounded-lg 
              bg-linear-to-r from-green-400 to-green-600 
              hover:scale-105 hover:shadow-xl transition-all duration-300
            "
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
