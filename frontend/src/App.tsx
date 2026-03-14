import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/UserProvider";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
      />
    </UserProvider>
  );
}

export default App;
