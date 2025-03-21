import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import {
  FaBars,
  
  FaListAlt,
  FaSignOutAlt,
  FaInfoCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest(".relative")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold text-blue-600">
          <span className="text-slate-800 dark:text-white">Job</span>Hub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-500 transition">Home</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-500 transition">About</Link>
          <Link to="/listing" className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-500 transition">Companies</Link>
          <Link to="/search" className="text-gray-700 dark:text-gray-200 text-xl hover:text-blue-500 transition">Jobs</Link>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full">
            {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link to="/create-listing">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
              Job/Internship
            </button>
          </Link>

          {currentUser ? (
            <div className="relative">
              <img
                onClick={toggleMenu}
                className="rounded-full h-8 w-8 object-cover cursor-pointer border-2 border-blue-500 hover:border-blue-700"
                src={currentUser.avatar}
                alt="profile"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                      <img className="rounded-full h-6 w-6 object-cover" src={currentUser.avatar} alt="profile" />
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaInfoCircle className="text-blue-500" />
                      <Link to="/Resume">Resume Analysis</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                      <FaListAlt className="text-blue-500" />
                      <Link to="/listing">My Listings</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                      <FaSignOutAlt className="text-red-500" />
                      <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">LogIn</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700  dark:text-gray-200">
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md rounded-b-lg">
          <ul className="flex flex-col gap-4 p-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">About</Link>
            <Link to="/listing" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">My Listings</Link>
            <Link to="/search" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">Jobs</Link>

            {/* Theme Toggle in Mobile Menu */}
            <button onClick={toggleTheme} className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center gap-2">
              {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
              <span className="text-gray-700 dark:text-gray-200">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}
