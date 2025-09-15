import { useEffect, useState } from "react";
import { fetch_system_info } from "../api/api";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShoppingCart,
  FiUser,
  FiCpu,
  FiDatabase,
  FiInfo,
} from "react-icons/fi";

const iconMap = {
  name: FiUser,
  email: FiMail,
  phone: FiPhone,
  location: FiMapPin,
  joined_date: FiCalendar,
  purchases: FiShoppingCart,
  version: FiCpu,
  database: FiDatabase,
  description: FiInfo,
};

const SystemDetails = () => {
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    const loadSystemInfo = async () => {
      const res = await fetch_system_info();
      setSystemInfo(res);
    };
    loadSystemInfo();
  }, []);

  const systemDetails = Object.entries(systemInfo || {});

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-900 flex items-center justify-center gap-3">
          <FiUser className="text-indigo-600" />
          System Information
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Overview of system configuration and details
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {systemDetails.map(([key, value]) => {
          const Icon = iconMap[key] || FiInfo;
          return (
            <div
              key={key}
              className="group bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition">
                  <Icon className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold capitalize text-gray-900">
                  {key.replace(/_/g, " ")}
                </h3>
              </div>
              <p className="text-gray-700 text-base font-medium leading-relaxed">
                {value === true
                  ? "Charging"
                  : value === false
                  ? "Not Charging"
                  : value ?? "N/A"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemDetails;
