import React, { useState } from "react";
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '..';
import { userProfileData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/operations/authAPI";


const UserProfilee = () => {
  
  const { currentColor } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="nav-item absolute right-1 top-2 bg-white dark:bg-[#42464D] p-3 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-500 text-lg dark:text-gray-400">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          
        />
      </div>
     
     
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src="./images/category_images/userpic.jpg"
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl text-gray-500 dark:text-gray-400"> {localStorage.getItem("firstName")} {localStorage.getItem("lastName")} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {localStorage.getItem("accountType")}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400 mr-4">{localStorage.getItem("email")} </p>
        </div>
      </div>
      <div>
      {userProfileData.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex gap-5 border-b-1 border-color p-3 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
        >
          <button
            type="button"
            style={{ color: item.iconColor, backgroundColor: item.iconBg }}
            className="text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            {item.icon}
          </button>

          <div>
            <p className="font-semibold text-gray-500 dark:text-gray-400">{item.title}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
          </div>
        </Link>
      ))}
      </div>
      <div className="mt-3">
      <button
        className="yguy"
        onClick={() => {
          dispatch(logout(navigate));
        }}
      >
       
        Log Out
      </button>
      </div>
    </div>

  );
};

export default UserProfilee;