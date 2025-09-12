import { useEffect, useState } from "react";
import { fetch_submissions } from "../api/api"; // <-- use your helper
import { FiMail, FiUser, FiMessageCircle } from "react-icons/fi";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      const res = await fetch_submissions();
      setSubmissions(res);
    };
    loadSubmissions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-center gap-2 mb-8">
        <FiMessageCircle className="text-2xl text-gray-700" />
        <h2 className="text-3xl font-bold text-gray-800">Form Submissions</h2>
      </div>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500">No submissions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="text-blue-500" /> {submission.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FiMail className="text-green-500" />
                  <span className="font-medium">Email:</span> {submission.email}
                </p>
                <p className="flex items-center gap-2">
                  <FiMessageCircle className="text-purple-500" />
                  <span className="font-medium">Message:</span> {submission.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;
