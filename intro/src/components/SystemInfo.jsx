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

  const systemDetails = Object.entries(systemInfo || {})

  return (
    <div className="p-6">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <FiUser className="text-3xl text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-800">
          System Information
        </h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemDetails.map(([key, value]) => {
          const Icon = iconMap[key] || FiInfo;
          return (
            <div
              key={key}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="text-xl text-indigo-500" />
                <h3 className="text-lg font-semibold capitalize text-gray-800">
                  {key.replace(/_/g, " ")}
                </h3>
              </div>
              <p className="text-gray-600 text-sm break-words">{value === true ? "Charging" : value === false ? "Not Charging" : value ?? "N/A"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemDetails;
