import { useEffect, useState } from "react";
import { fetch_submissions } from "../api/api"; // <-- use your helper
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      const res = await fetch_submissions();
      setSubmissions(res || []);
    };
    loadSubmissions();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <FiMessageCircle className="text-3xl text-blue-700" />
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
          Form Submissions
        </h2>
      </div>

      {/* Submissions Table */}
      {submissions.length === 0 ? (
        <p className="text-center text-gray-500">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-50 text-gray-900 text-sm font-semibold">
              <tr>
                <th className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-blue-600" /> Name
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-green-600" /> Email
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <FiMessageCircle className="text-purple-600" /> Message
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {submission.name || "Anonymous"}
                  </td>
                  <td className="px-6 py-3">{submission.email || "N/A"}</td>
                  <td className="px-6 py-3">{submission.message || "No message"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Submissions;
