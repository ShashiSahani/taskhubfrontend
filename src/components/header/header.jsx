import { useState } from "react";
import {
  Menu,
  X,
  MoreVertical,
  User,
  Lock,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  List,
  BookOpen,
  Info,
  Calculator,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/loginSlice";
import logo from "../../../public/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-primary-light text-primary-dark py-4 px-6 shadow-md border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center">
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 rounded-full cursor-pointer shadow-md mr-2"
            />
          </NavLink>
          <NavLink to="/">
            <h1 className="text-2xl font-bold text-primary-dark hover:text-white text-shadow-lg cursor-pointer">
              TaskHub
            </h1>
          </NavLink>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-4 items-center">
          <NavLink to="/home" className="hover:text-gray-300 flex items-center gap-1">
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/task" className="hover:text-gray-300 flex items-center gap-1">
            <List size={18} /> Tasks
          </NavLink>
          <NavLink to="/blog" className="hover:text-gray-300 flex items-center gap-1">
            <BookOpen size={18} /> Blog
          </NavLink>
          <NavLink to="/calculator" className="hover:text-gray-300 flex items-center gap-1">
            <Calculator size={18} /> Calculator
          </NavLink>
          <NavLink to="/aboutus" className="hover:text-gray-300 flex items-center gap-1">
            <Info size={18} /> About
          </NavLink>

          {/* Hover-based Dropdown */}
          <div className="relative group">
            <button className="focus:outline-none">
              <MoreVertical size={28} className="cursor-pointer" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {user ? (
                  <>
                    <li onClick={() => navigate("/profile")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"><User size={18} /> Profile</li>
                    <li onClick={() => navigate("/change-password")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"><Lock size={18} /> Change Password</li>
                    <li onClick={handleLogout} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-red-500"><LogOut size={18} /> Logout</li>
                  </>
                ) : (
                  <>
                    <li onClick={() => navigate("/login")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"><LogIn size={18} /> Login</li>
                    <li onClick={() => navigate("/register")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"><UserPlus size={18} /> Register</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-light py-4 px-4">
          <nav className="flex flex-col space-y-2">
            <NavLink to="/home" className="hover:text-gray-300">Home</NavLink>
            <NavLink to="/task" className="hover:text-gray-300">Tasks</NavLink>
            <NavLink to="/blog" className="hover:text-gray-300">Blog</NavLink>
            <NavLink to="/calculator" className="hover:text-gray-300">Calculator</NavLink>
            <NavLink to="/aboutus" className="hover:text-gray-300">About</NavLink>

            {/* Mobile Settings Dropdown */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer text-primary-dark hover:text-gray-300">
                <span className="flex items-center gap-2"><User size={18} /> Settings</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <ul className="mt-2 pl-4 space-y-2">
                {user ? (
                  <>
                    <li onClick={() => navigate("/profile")} className="cursor-pointer hover:text-gray-500 flex items-center gap-2"><User size={18}/> Profile</li>
                    <li onClick={() => navigate("/change-password")} className="cursor-pointer hover:text-gray-500 flex items-center gap-2"><Lock size={18}/> Change Password</li>
                    <li onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-700 flex items-center gap-2"><LogOut size={18}/> Logout</li>
                  </>
                ) : (
                  <>
                    <li onClick={() => navigate("/login")} className="cursor-pointer hover:text-gray-500 flex items-center gap-2"><LogIn size={18}/> Login</li>
                    <li onClick={() => navigate("/register")} className="cursor-pointer hover:text-gray-500 flex items-center gap-2"><UserPlus size={18}/> Register</li>
                  </>
                )}
              </ul>
            </details>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
