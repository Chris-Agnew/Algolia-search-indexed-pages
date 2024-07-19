import React from "react";

const Spinner: React.FC = () => {
  // Spinner component to show loading state when fetching data
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="flex items-center justify-center space-x-2"
      >
        <svg
          className="w-12 h-12 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
