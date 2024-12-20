import React from "react";

interface UserDemographics {
  count: number;
  ageBracket: string;
}

interface ContentProps {
  data: UserDemographics[];
}

const UserEngagement = ({ data }: ContentProps) => {

  const demographics = Array.isArray(data) ? data : [];
  console.log("demography", demographics)
  return (
    <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md max-w-sm md:py-1 lg:py-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        User Engagement
      </h2>
      <div className="flex justify-between space-x-8 border-b border-gray-300 pb-3 mb-5">
        <span className="text-gray-900 font-medium">Age range</span>
        <span className="text-gray-900 text-end">Count</span>
      </div>
      <ul>
        {demographics.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-4 text-gray-700"
          >
            <span>{item.ageBracket}</span>
            <div className="flex items-center w-28">
              {/* Visual bar showing demographic count */}
              <div
                className="h-[2px] bg-gray-400 mr-1"
                style={{ flex: item.count }}
              ></div>
              <div
                className="h-[2px] bg-gray-300"
                style={{ flex: Math.max(1, 10 - item.count) }}
              ></div>
            </div>
            <span className="text-gray-500 text-sm">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEngagement;
