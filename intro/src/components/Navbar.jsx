import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiServer, FiActivity, FiInfo, FiFile } from "react-icons/fi";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-200 to-blue-300 shadow-md py-4 px-6 mb-6 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-900 flex items-center">
          <Link to="/" className="flex items-center">
            <FiActivity className="mr-2 text-blue-900" />
            System Info Dashboard
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-700 font-semibold">
          <Link to="/" className="hover:text-blue-600 flex items-center">
            <FiHome className="mr-1" /> Home
          </Link>
          <Link to="/customers" className="hover:text-purple-600 flex items-center">
            <FiUsers className="mr-1" /> Customers
          </Link>
          <Link to="/system" className="hover:text-green-600 flex items-center">
            <FiServer className="mr-1" /> System Info
        </Link>

        <Link to="/form" className="hover:text-blue-600 flex items-center">
          <FiActivity className="mr-1" /> Form
        </Link>

        <Link to="/submissions" className="hover:text-blue-600 flex items-center">
          <FiFile className="mr-1" /> Submissions
        </Link>

        <Link to="/about" className="hover:text-green-600 flex items-center">
          <FiInfo className="mr-1" /> About Dev
        </Link>
      </nav>
    </div>
  </header>
  );
}

export default Navbar;