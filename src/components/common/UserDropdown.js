import React, { useState } from "react";
import "./UserDropdown.css"; // Import your CSS file for styles
import UserProfilee from "./UserProfilee";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        id="dropdownAvatarNameButton"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <img
          className="w-10 h-9 me-2 rounded-full"
          src="./images/category_images/userpic.jpg"
          alt="User avatar"
        />
        <p className="fisstname">{localStorage.getItem("firstName")}</p>
        <p className="lastname">{localStorage.getItem("lastName")}</p>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <UserProfilee />
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
