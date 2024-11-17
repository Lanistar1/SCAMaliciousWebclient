import React from "react";

const UserEngagement = () => {
  const ageRanges = ["18-20", "21-25", "26-30", "30-40", "40-50", "50-70"];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        User Engagement
      </h2>
      <div className="flex space-x-8 border-b border-gray-300 pb-3 mb-5">
        <span className="text-gray-900 font-semibold">Age</span>
        <span className="text-gray-400">Demographics</span>
      </div>
      <ul>
        {ageRanges.map((range, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-4 text-gray-700"
          >
            <span>{range}</span>
            <div className="flex items-center w-28">
              <div className="h-[2px] bg-gray-400 flex-1 mr-1"></div>
              <div className="h-[2px] bg-gray-300 flex-1"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEngagement;
