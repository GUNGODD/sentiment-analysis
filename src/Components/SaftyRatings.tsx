import React from "react";

interface SafetyRating {
  category: string;
  probability: string;
}

interface SafetyRatingsProps {
  ratings: SafetyRating[];
}

const SafetyRatings: React.FC<SafetyRatingsProps> = ({ ratings }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold text-pink-700 mb-4">Safety Ratings:</h2>
      <ul>
        {ratings.map((rating, index) => (
          <li
            key={index}
            className="mb-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <span className="font-semibold text-blue-700">
              {rating.category}:{" "}
            </span>
            <span className="text-gray-700">{rating.probability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyRatings;
