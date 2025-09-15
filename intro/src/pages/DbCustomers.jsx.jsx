import { useEffect, useState, useMemo } from "react";
import{Link} from "react-router-dom";
import {
  fetch_customers_data,
  updateCustomer,
  deleteCustomer,
} from "../api/api";
import ReactCountryFlag from "react-country-flag";
import { normalizeCountryCode } from "../utils/countryCodes";
import { FiEdit, FiDelete, FiSave, FiX,FiUserPlus } from "react-icons/fi";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DbCustomersDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await fetch_customers_data();
      setCustomers(res || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      toast.error("Failed to load customers");
    }
  };

  const handleEdit = (id, customer) => {
    setEditId(id);
    setEditData({ ...customer });
  };

  const handleSave = async (id) => {
    try {
      await updateCustomer(id, editData);
      toast.success("Customer updated successfully!");
      setEditId(null);
      loadCustomers();
    } catch (err) {
      console.error("Error updating customer:", err);
      toast.error("Failed to update customer!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this customer? ID: ${id}`)) {
      try {
        await deleteCustomer(id);
        toast.success("Customer deleted successfully!");
        loadCustomers();
      } catch (err) {
        console.error("Error deleting customer:", err);
        toast.error("Failed to delete customer!");
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Button to add a new customer */}
      <div className="mb-4">
        <Link to="/add-customer">
          <button className="bg-blue-900 text-white px-4 py-2 rounded">
            <FiUserPlus className="inline-block mr-1" />
            Add Customer
          </button>
        </Link>
      </div>
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          All Database Customers
        </h2>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-50 text-gray-900 text-sm font-semibold">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => {
              const countryCode = normalizeCountryCode(customer.country);
              const isEditing = editId === customer.customer_id;

              return (
                <tr
                  key={customer.customer_id}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  {/* Name */}
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.first_name || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              first_name: e.target.value,
                            })
                          }
                          className="border p-1 rounded mb-1 block w-full"
                        />
                        <input
                          type="text"
                          value={editData.last_name || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              last_name: e.target.value,
                            })
                          }
                          className="border p-1 rounded block w-full"
                        />
                      </>
                    ) : (
                      `${customer.first_name || "Unknown"} ${
                        customer.last_name || ""
                      }`
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-3">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      customer.email
                    )}
                  </td>

                  {/* Phone with geo selector */}
                  <td className="px-6 py-3">
                    {isEditing ? (
                      <PhoneInput
                        country={countryCode ? countryCode.toLowerCase() : "us"}
                        value={editData.phone || ""}
                        onChange={(value) =>
                          setEditData({ ...editData, phone: value })
                        }
                        inputStyle={{ width: "100%" }}
                      />
                    ) : (
                      customer.phone
                    )}
                  </td>

                  {/* Address */}
                  <td className="px-6 py-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, address: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      customer.address
                    )}
                  </td>

                  {/* Country with dropdown + flag */}
                  <td className="px-6 py-3 flex items-center gap-2">
                    {isEditing ? (
                      <Select
                        options={options}
                        value={options.find(
                          (opt) => opt.label === editData.country
                        )}
                        onChange={(selected) =>
                          setEditData({
                            ...editData,
                            country: selected.label,
                          })
                        }
                        className="w-40"
                      />
                    ) : (
                      <>
                        {countryCode && (
                          <ReactCountryFlag
                            countryCode={countryCode}
                            svg
                            style={{ width: "1.5em", height: "1.5em" }}
                            title={customer.country}
                          />
                        )}
                        {customer.country}
                      </>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3">
                    {isEditing ? (
                      <>
                        <button
                          className="text-green-600 hover:underline mr-4"
                          onClick={() => handleSave(customer.customer_id)}
                        >
                          <FiSave className="inline mr-1" /> Save
                        </button>
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={() => setEditId(null)}
                        >
                          <FiX className="inline mr-1" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:underline mr-4"
                          onClick={() =>
                            handleEdit(customer.customer_id, customer)
                          }
                        >
                          <FiEdit className="inline mr-1" /> Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(customer.customer_id)}
                        >
                          <FiDelete className="inline mr-1" /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DbCustomersDetails;
