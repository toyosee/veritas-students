import { Link } from "react-router-dom";
import {FiUsers, FiServer, FiActivity, FiInfo, FiDatabase, FiHelpCircle} from "react-icons/fi";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-200 to-blue-300 shadow-md py-4 px-6 mb-6 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-900 flex items-center">
          <Link to="/" className="flex items-center">
            <FiActivity className="mr-2 text-blue-900" />
            IT Students
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-gray-700 font-semibold">
          <Link to="/" className="text-blue-900 hover:text-green-600 flex items-center">
            <FiDatabase className="mr-1" /> Dashboard
          </Link>
          <Link to="/parent" className="text-blue-900 hover:text-green-600 flex items-center">
            <FiHelpCircle className="mr-1" /> Child Care
          </Link>
          <Link to="/system" className="text-blue-900 hover:text-green-600 flex items-center">
            <FiServer className="mr-1" /> System Info
          </Link>

        <Link to="/about" className="text-blue-900 hover:text-green-600 flex items-center">
          <FiInfo className="mr-1" /> About Dev
        </Link>
      </nav>
    </div>
  </header>
  );
}

export default Navbar;