import React from "react";
import {
  FiUser,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiMapPin,
  FiActivity,
} from "react-icons/fi";

function AboutDeveloper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-200 text-gray-800 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-900 tracking-tight">
        <FiActivity className="inline-block mr-2 text-blue-900" />
        Meet the Developer
      </h1>

      {/* Developer Card */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-indigo-300 shadow-lg hover:scale-105 transition-transform duration-300">
              <img
                src="/coder_guy.png" // Replace with your actual image path in public/
                alt="Elijah Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Developer Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FiUser className="text-blue-700" />
                Elijah — Full Stack Developer
              </h2>
              <p className="text-gray-600 mt-2 text-base">
                Building elegant interfaces, powerful APIs, and scalable systems with a passion for clean code and creative problem-solving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <FiMapPin className="text-red-500" />
                <span className="font-medium">Location:</span> Kaduna, Nigeria
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-blue-500" />
                <span className="font-medium">Email:</span> elijah.dev@example.com
              </p>
              <p className="flex items-center gap-2">
                <FiCode className="text-green-500" />
                <span className="font-medium">Specialty:</span> Scalable web apps & dashboards
              </p>
              <p className="flex items-center gap-2">
                <FiGithub className="text-gray-800" />
                <a
                  href="https://github.com/elijah-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 font-medium"
                >
                  GitHub Profile
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiLinkedin className="text-blue-700" />
                <a
                  href="https://linkedin.com/in/elijah-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 font-medium"
                >
                  LinkedIn Profile
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutDeveloper;