import { Link } from "react-router-dom";

type Props = {
    symbol: string;
}

const CompFinderItem = ({symbol} : Props) => {
  return (
    <Link
    reloadDocument
    to={`/Company/${symbol}/company-profile`}
    type="button"
    className="inline-flex items-center p-4 rounded-l-lg ">
        {symbol}

    </Link>
  )
}

export default CompFinderItem;