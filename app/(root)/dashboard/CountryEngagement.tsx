import React from "react";

interface CountryDemographics {
  count: number;
  country: string;
}

interface ContentProps {
  data: CountryDemographics[];
}

const CountryEngagement = ({ data }: ContentProps) => {
  const demographics = Array.isArray(data) ? data : [];
  console.log("demographics", demographics);

  return (
    <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md max-w-sm md:py-1 lg:py-6">
      <h2 className="text-[14px] font-medium text-black mb-4">
        Country Engagement
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <span className="text-black text-[12px] font-medium">Country</span>
        <span className="text-black text-[12px] font-medium text-center">
          Count
        </span>
      </div>

      <ul>
        {demographics.map((item, index) => (
          <li
            key={index}
            className="grid grid-cols-2 gap-4 items-center mb-4 text-gray-700"
          >
            <span className="text-[13px] uppercase">{item.country}</span>
            <span className="text-center text-[13px]">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryEngagement;
