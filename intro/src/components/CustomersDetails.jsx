import { useEffect, useState } from "react";
import { fetch_customers } from "../api/api";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const CustomersDetails = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const res = await fetch_customers();
      setCustomers(res.customers);
    };
    loadCustomers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-center gap-2 mb-8">
        <FiUser className="text-2xl text-gray-700" />
        <h2 className="text-3xl font-bold text-gray-800">Customer Profiles</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {customer.name}
            </h3>

            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <p className="flex items-center gap-2">
                <FiMail className="text-blue-500" />
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-green-500" />
                <span className="font-medium">Phone:</span> {customer.phone}
              </p>
              <p className="flex items-center gap-2">
                <FiMapPin className="text-red-500" />
                <span className="font-medium">Location:</span> {customer.location}
              </p>
              <p className="flex items-center gap-2">
                <FiCalendar className="text-purple-500" />
                <span className="font-medium">Joined:</span> {customer.joined_date}
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                <FiShoppingCart className="text-yellow-500" />
                Purchases
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {customer.purchases.length > 0 ? customer.purchases.map((purchase, index) => (
                  <li key={index}>
                    <span className="font-medium">{purchase.item}</span> – {purchase.amount}
                    <span className="text-gray-500 text-xs ml-1">
                      (Date: {purchase.date})
                    </span>
                  </li>
                )) : <strong className="text-red-500">No purchases found.</strong>}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersDetails;