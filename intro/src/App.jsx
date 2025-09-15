import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetch_home_page,
  fetch_server_details,
  fetch_username
} from "./api/api";

import {
  FiHome,
  FiServer,
  FiUsers,
  FiActivity,
  FiSun,
  FiCloud,
  FiMoon,
  FiUserPlus,
  FiMessageCircle,
  FiSettings,
  FiDatabase,
} from "react-icons/fi";

function App() {
  const [data, setData] = useState("");
  const [serverDetails, setServerDetails] = useState({});
  const [username, SetUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, detailsRes, userRes] = await Promise.all([
          fetch_home_page(),
          fetch_server_details(),
          fetch_username()
        ]);
        setData(homeRes);
        setServerDetails(detailsRes);
        SetUsername(userRes);
      } catch (err) {
        console.error("Error fetching home page:", err);
      }
    };
    fetchData();
  }, []);

  const handleSettings = () => {
    alert("Settings Functionality Coming Soon!");
  };

  const serverDetailsArray = Object.entries(serverDetails || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
          <FiDatabase className="text-blue-600" /> Dashboard
        </h2>
        <nav className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiHome /> Home
          </Link>
          <Link to="/dbcustomers" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiUsers /> DB Customers
          </Link>
          <Link to="/form" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiUserPlus /> Form
          </Link>
          <Link to="/add-customer" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiUserPlus /> Add Customer
          </Link>
          <Link to="/submissions" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiMessageCircle /> Submissions
          </Link>
          <Link to="/customers" className="flex items-center gap-2 text-blue-900 hover:text-green-600 transition">
            <FiUsers /> System Customers
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100 text-sm text-gray-500 flex items-center gap-2">
          <FiSettings onClick={handleSettings} /> Settings
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-12">
          Welcome, {username}
        </h1>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Home Data Card */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl rounded-3xl p-10 flex flex-col items-center justify-center transform hover:scale-105 transition duration-500">
            {/* Icon */}
            <div className="mb-6">
              {data?.trim() === "Good Morning!" ? (
                <FiSun className="text-yellow-300 text-6xl animate-pulse" />
              ) : data?.trim() === "Good Afternoon!" ? (
                <FiCloud className="text-white text-6xl animate-bounce" />
              ) : data?.trim() === "Good Evening!" ? (
                <FiMoon className="text-gray-200 text-6xl animate-pulse" />
              ) : (
                <FiHome className="text-white text-6xl" />
              )}
            </div>

            <h2 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">
              {data || "Loading..."}
            </h2>
            <p className="text-lg font-medium opacity-90">
              Welcome back, <span className="font-bold">{username}</span>
            </p>
            <p className="text-sm mt-4 opacity-80">
              Admin Panel • Server Status Overview
            </p>
          </div>

          {/* Server Details Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition h-full">
            <div className="flex items-center mb-6">
              <FiServer className="text-green-500 text-3xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Server Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  {serverDetailsArray.map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-6 py-3 font-semibold text-gray-800 w-1/3 border-b border-gray-200">
                        {key}
                      </td>
                      <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
