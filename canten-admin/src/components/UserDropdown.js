import React, { useState } from "react";

import "./UserDropdown.css"; // Import your CSS file for styles

// import { logout } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
      >
        <span className="sr-only">Open user menu</span>

        <img
          className="w-4 h-2 me-2 rounded-fulll"
          src="https://photosnow.org/wp-content/uploads/2024/04/new-whatsapp-dp_18.jpg"
        ></img>

        {/* <p>Email: {user.email}</p> */}
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
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium">
              {" "}
              <p>Hii {localStorage.getItem("firstName")}</p>
            </div>

            <div className="truncate">Thanks For Vist </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownAvatarNameButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Your Order
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Track Order
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button
              className="yguy"
              onClick={() => {
                //   dispatch(logout(navigate));
              }}
            >
              {/* <%= userdata.name %> */}
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
