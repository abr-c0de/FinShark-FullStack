import { useState, useEffect } from "react";
import { useAuth } from "../../Context/UseAuth";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LogOut, LogIn, UserPlus, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Main Links */}
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center gap-2 z-50">
                <img src={logo} alt="Logo" className="h-10 w-auto hover:scale-105 transition-transform" />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex space-x-8 font-semibold text-gray-800">
                <Link
                  to="/SearchPage"
                  className="group flex items-center gap-1 relative hover:text-emerald-600 transition-colors duration-300"
                >
                  <Search className="w-4 h-4" />
                  Search
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            {/* Desktop Right Side User/Login */}
            <div className="hidden lg:flex items-center space-x-6">
              {isLoggedIn() ? (
                <>
                  <div className="font-bold text-lg relative bg-linear-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x cursor-default">
                    Welcome, {user?.username}
                  </div>
                  <button
                    onClick={logOut}
                    className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white bg-linear-to-r from-emerald-400 to-emerald-600 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/LoginPage"
                    className="flex items-center gap-1 font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/RegisterPage"
                    className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white bg-linear-to-r from-emerald-400 to-emerald-600 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden text-gray-800 focus:outline-none z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden flex flex-col space-y-6 shadow-2xl"
          >
            <Link
              to="/SearchPage"
              className="flex items-center gap-3 text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="w-6 h-6 text-emerald-600" />
              Search
            </Link>

            {isLoggedIn() ? (
              <div className="flex flex-col space-y-6 pt-4">
                <div className="text-xl font-bold bg-linear-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                  Welcome, {user?.username}
                </div>
                <button
                  onClick={() => {
                    logOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-emerald-600"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  to="/LoginPage"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-emerald-700 bg-emerald-50 border border-emerald-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
                <Link
                  to="/RegisterPage"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-emerald-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-5 h-5" />
                  Signup
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacing to prevent content from hiding under the fixed navbar */}
      <div className="h-24"></div>

      {/* Tailwind + custom animation for rainbow shimmer */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 300% 300%;
            animation: gradient-x 5s ease infinite;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;