// import { useEffect, useState } from "react";
// import type { CompanyTenK } from "../../company";
// import { GetTenK } from "../../api";
// import TenKFinderItem from "./TenKFinderItem";
// import Spinner from "../Spinners/Spinner";

// type TenKFinderProps = {
//     ticker: string;
// }

// const TenKFinder = ({ticker} : TenKFinderProps) => {

//     const [companyTenKData, setCompanyTenKData] = useState<CompanyTenK[]>([]);

//     useEffect(() => {
//         const fetchTenKData = async () => {
//             const value = await GetTenK(ticker);
//             setCompanyTenKData(value?.data);
//         }
//         fetchTenKData();
//     }, [ticker])

//   return (
//     <div className="inline-flex rounded-md shadow-sm m-4">
//         {companyTenKData ? (
//             companyTenKData.slice(0,5).map((tenK) => (
//                 <TenKFinderItem tenK={tenK} key={tenK.filingDate}/>
//             ))

            
//         ) : (
//             <Spinner/>
//         )}
//     </div>
//   )
// }

// export default TenKFinder;
