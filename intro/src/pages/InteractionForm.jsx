import React, { useState } from "react";
import { FiSend, FiUser, FiMail, FiMessageCircle } from "react-icons/fi";
import { submit_form_data } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SubmitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const result = await submit_form_data(formData);
      setStatus(result.message || "Submission successful!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-800 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiSend className="text-blue-600" />
          Interaction Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50">
              <FiMessageCircle className="text-gray-400 mt-1 mr-2" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Write your message..."
                className="w-full bg-transparent outline-none text-gray-800 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* View Submissions Button */}
          <button
            type="button"
            onClick={() => navigate("/submissions")}
            className="w-full py-2 px-4 rounded-lg text-white font-semibold transition bg-gray-600 hover:bg-gray-700"
          >
            View Submissions
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-sm text-center text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
