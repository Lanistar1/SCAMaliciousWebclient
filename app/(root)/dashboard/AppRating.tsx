import React from "react";

interface RatingData {
  rating: number;
  count: number;
}

interface AppRatingProps {
  data: RatingData[];
}

const AppRating = ({ data }: AppRatingProps) => {
  // Calculate total ratings
  const totalRatings = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-medium text-gray-700 mb-4">App Ratings</h2>
      <ul>
        {data.map((item) => {
          const percentage =
            totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;

          return (
            <li key={item.rating} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Rating {item.rating}</span>
                <span className="text-gray-500 text-sm">
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AppRating;
