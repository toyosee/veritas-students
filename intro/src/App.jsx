import { useEffect, useState } from "react";
import {
  fetch_home_page,
  fetch_server_details,
  fetch_username
} from "./api/api";

// React Icons
import {
  FiHome,
  FiServer,
  FiUsers,
  FiActivity,
  FiSun,
  FiCloud,
  FiMoon,
  FiUser
} from "react-icons/fi";

function App() {
  const [data, setData] = useState("");
  const [serverDetails, setServerDetails] = useState("");
  const [username, SetUsername] = useState("")

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
        SetUsername(userRes)
      } catch (err) {
        console.error("Error fetching home page:", err);
      }
    };
    fetchData();
  }, []);

  // Convert server details Object to array once for use
  const serverDetailsArray = Object.entries(serverDetails || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-800 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900">
        <FiActivity className="inline-block mr-2 text-blue-900" />
        Welcome {username}
      </h1>
      {/* Home Data Card */}
      <div className="max-w-2xl mx-auto mb-8 bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center mb-4">
          <FiHome className="text-blue-500 text-2xl mr-2" />
          <p className="text-xl font-semibold text-gray-700">Home API Response</p>
        </div>
        <p className="text-gray-600 font-bold">
          {
            data?.trim() === "Good Morning!" ?
              (<>
                <FiSun className="inline-block mr-2 text-yellow-500" /> {data}
              </>)
              : data?.trim() === "Good Afternoon!" ?
              (<><FiCloud className="inline-block mr-2 text-blue-500" /> {data}</>)
              : data?.trim() === "Good Evening!" ?
              (<><FiMoon className="inline-block mr-2 text-gray-500" /> {data}</>)
              : "Loading..."
          } - {username}
        </p>
      </div>

      {/* Server Details Card */}
      <div className="max-w-2xl mx-auto mb-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <FiServer className="text-green-500 text-3xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Server Details</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {serverDetailsArray.map(([key, value]) => (
            <li key={key} className="py-2 flex justify-between items-center">
              {key.toLowerCase() === "error" ? (
                <>
                  <span className="text-sm font-medium text-red-700">{key}</span>
                  <span className="text-sm font-bold text-red-500">{value}</span>
                </>
              ) : (
                <>
                  {key.toLowerCase() === "developer" ? (
                      <>
                        <FiUser className="text-blue-900 font-bold" onClick={() => alert(`Developer Details: ${value}`)} />
                        <span className="text-sm font-bold text-blue-900">{key}</span>
                        <span className="text-sm font-bold text-blue-500">{value}</span>
                      </>
                    ) : (
                        <>
                          <FiServer className="text-blue-900 font-bold" onClick={() => alert(`Server Details: ${value}`)} />
                          <span className="text-sm font-medium text-gray-700">{key}</span>
                          <span className="text-sm font-bold text-gray-500">{value}</span>
                        </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;