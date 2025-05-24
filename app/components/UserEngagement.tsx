import React from "react";

interface UserDemographics {
  count: number;
  maleCount: number;
  femaleCount: number;
  otherCount: number;
  ageBracket: string;
}

interface ContentProps {
  data: UserDemographics[];
}

const UserEngagement = ({ data }: ContentProps) => {
  const demographics = Array.isArray(data) ? data : [];
  console.log("demographics", demographics);

  return (
    <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md max-w-sm md:py-1 lg:py-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">User Engagement</h2>
      
      <div className="grid grid-cols-5 gap-4 mb-5">
        <span className="text-gray-900 font-medium">Age range</span>
        <span className="text-gray-900 font-medium text-center">Male Count</span>
        <span className="text-gray-900 font-medium text-center">Female Count</span>
        <span className="text-gray-900 font-medium text-center">Others Count</span>
        <span className="text-gray-900 font-medium text-center">Total Count</span>
      </div>

      <ul>
        {demographics.map((item, index) => (
          <li key={index} className="grid grid-cols-5 gap-4 items-center mb-4 text-gray-700">
            <span>{item.ageBracket}</span>
            <span className="text-center">{item.maleCount}</span>
            <span className="text-center">{item.femaleCount}</span>
            <span className="text-center">{item.otherCount}</span>
            <span className="text-center">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEngagement;
