import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wider">
        SnapStudio
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/portfolio" className="hover:text-gray-300">
          Portfolio
        </Link>
        <Link to="/booking" className="hover:text-gray-300">
          Book Now
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>

        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link to="/admin/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/admin"
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
