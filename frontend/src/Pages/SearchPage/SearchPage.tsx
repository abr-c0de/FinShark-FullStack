import { useEffect, useState } from "react";
import type { CompanySearch } from "../../company";
import CardList from "../../Component/CardList/CardList";
import ListPortfolio from "../../Component/Portfolio/ListPortfolio/ListPortfolio";
import { SearchCompanies } from "../../api";
import Search from "../../Component/Search/Search";
import type { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [error, setError] = useState<string>("");

  const getPortfolio = async () => {
    try {
      const res = await portfolioGetAPI();
      if (res?.data) {
        setPortfolioValues(res.data);
      }
    } catch {
      toast.warning("Could not get portfolio values!");
    }
  };

  useEffect(() => {
     getPortfolio();
  }, []);

  const onPortfolioDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const symbolInput = form.elements[0] as HTMLInputElement;
    const value = symbolInput.value;

    const res = await portfolioDeleteAPI(value);

    if (res?.status === 200) {
      toast.success("Stock removed successfully!");
      await getPortfolio();
    }
  };

  const onPortfolioCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const symbolInput = form.elements[0] as HTMLInputElement;
    const value = symbolInput.value;

    try {
      const res = await portfolioAddAPI(value);

      if (res?.status === 200) {
        toast.success("Stock added to portfolio!");
        getPortfolio();
      }
    } catch {
      toast.warning("Could not add portfolio");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    // console.log(search);
  };
  const onSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await SearchCompanies(search);

    if (typeof result === "string") {
      console.log("Error:", result);
      setError(result);
      console.log(error);
    } else if (Array.isArray(result)) {
      // console.log("Search Result:", result); // ✅ THIS WORKS
      setSearchResult(result);
    }
  };

  console.log(searchResult);

  return (
    <>
      <div className="App">
        {/* <Navbar /> */}
        {/* <Hero/> */}
        <Search
          onSearchSubmit={onSearchSubmit}
          handleSearchChange={handleSearchChange}
          search={search}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <CardList
          searchResults={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />
      </div>
    </>
  );
};

export default SearchPage;
