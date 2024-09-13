import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BsArrowClockwise } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { SiPivotaltracker } from "react-icons/si";
import { MdOutlineRestaurantMenu, MdLocalOffer } from "react-icons/md";
import { GoCodeOfConduct } from "react-icons/go";
import { FaAddressBook } from "react-icons/fa6";

const SidebarNavbar = () => {
  const [nav, setNav] = useState(false);

  const menuItems = [
    { icon: <SiPivotaltracker size={25} className="mr-4" />, text: "Track Your Order" },
    { icon: <BsArrowClockwise size={25} className="mr-4" />, text: "Order History" },
    { icon: <BiSolidOffer size={25} className="mr-4" />, text: "Deals and Offer" },
    { icon: <MdOutlineRestaurantMenu size={25} className="mr-4" />, text: "Menu" },
    { icon: <MdLocalOffer size={25} className="mr-4" />, text: "Everyday Value Offers" },
    { icon: <GoCodeOfConduct size={25} className="mr-4" />, text: "Terms & Conditions" },
    { icon: <FaAddressBook size={25} className="mr-4" />, text: "My address" },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-2">
      {/* Left side */}
      <div onClick={() => setNav(!nav)} className="cursor-pointer">
        <AiOutlineMenu size={30} />
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav && (
        <div
          className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
          onClick={() => setNav(false)} // Close the sidebar when clicking on the overlay
        ></div>
      )}

      {/* Side drawer menu */}
      <div
        className={`fixed top-0 left-0 w-[300px] h-screen bg-white z-20 transition-transform duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-6 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Main <span className="font-bold">Menu</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text }, index) => (
              <div key={index} className="flex py-4 items-center justify-between">
                <li className="text-md flex cursor-pointer rounded-full p-2 hover:text-white hover:bg-black">
                  {icon} {text}
                </li>
                <IoIosArrowForward />
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavbar;
