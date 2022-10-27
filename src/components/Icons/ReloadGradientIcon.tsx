import React from "react";

const ReloadGradientIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="url(#grad1)"
      viewBox="0 0 17 17"
    >
      <defs>
        <linearGradient id="grad1">
          <stop offset="0%" stopColor="#fbbf24"></stop>
          <stop offset="50%" stopColor="#f472b6"></stop>
          <stop offset="100%" stopColor="#6366f1"></stop>
        </linearGradient>
      </defs>
      <path d="M6 8H0V2h1v4.109C2.013 2.916 5.036.625 8.5.625c3.506 0 6.621 2.36 7.574 5.739l-.963.271A6.898 6.898 0 008.5 1.624C5.274 1.625 2.484 3.9 1.792 7H6v1zm5 1v1h4.208c-.693 3.101-3.479 5.375-6.708 5.375a6.895 6.895 0 01-6.611-5.011l-.963.271A7.9 7.9 0 008.5 16.374c3.459 0 6.475-2.28 7.5-5.482V15h1V9h-6z"></path>
    </svg>
  );
};

export default ReloadGradientIcon;
