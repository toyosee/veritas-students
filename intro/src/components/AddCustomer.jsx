// component to add customer to database
import React, { useState, useMemo } from "react";
import { createCustomer } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(""); // store country name
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newCustomer = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address,
      city,
      country,
    };

    try {
      const result = await createCustomer(newCustomer);
      if (result?.id) {
        toast.success("Customer added successfully", {
          position: "top-right",
        });
        // reset fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setCountry("");
      } else {
        toast.error("Failed to add customer", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error adding customer.", {
        position: "top-right",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-2xl mt-8">
      <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center flex items-center justify-center gap-2">
        <FiUser className="text-blue-900" /> Add New Customer
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First + Last Name */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FiMail className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-2 outline-none"
          />
        </div>

        {/* Phone with Country Code */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <PhoneInput
            country={"ng"} // default to Nigeria
            value={phone}
            onChange={(value) => setPhone(value)}
            inputClass="w-full py-2 outline-none border-none"
            buttonClass="border-none"
            containerClass="flex w-full"
          />
        </div>

        {/* Address */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3">
          <FiMapPin className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full py-2 outline-none"
          />
        </div>

        {/* City + Country Dropdown */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3">
            <FiGlobe className="text-gray-500 mr-2" />
            <Select
              options={options}
              value={options.find((c) => c.label === country) || null}
              onChange={(val) => setCountry(val.label)} // store country NAME
              className="w-full"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          {loading ? "Adding..." : "Add Customer"}
        </button>

        {/* Link back to customer list */}
        <Link to="/dbcustomers">
          <button className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition duration-300">
            Back to Customer List
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddCustomer;
