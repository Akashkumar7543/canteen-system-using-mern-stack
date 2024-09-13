import React from "react";
// import Menu from './Menu';

import "../core/Styles.css";

// import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavSec from "./NavSec";
import UserDropdown from "./UserDropdown";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const { token } = useSelector((state) => state.auth);
  // const {user} = useSelector( (state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="main-navbarr shadow-sm sticky-top">
      <div className="top-navbar navbar-background">
        <div className="container-fluid ">
          <div className="row ">
            <a
              href="/"
              className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block"
            >
              <div className="brand-flex">
                <h5 className="brand-name">Amity</h5>
                <h5 className="brand-name-color">Nexus</h5>
              </div>
              <div className="logo-img">
                <img src="./images/category_images/logo.png"></img>
              </div>
            </a>
            <div className="col-md-1 my-auto">{/* <Menu /> */}</div>
            {/* Search-bar start */}
            <div className="col-md-5 my-auto">
              <div class="search-bar flex rounded-full bg-white shadow-md">
                <input
                  type="text"
                  placeholder="Search your favourite food..........."
                  class="rounded-l-full py-2 px-4 outline-none"
                />
                <div class="sercb">
                  <button
                    type="submit"
                    class="rounded-r-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4"
                  >
                    <svg
                      className="w-7 h-6 text-white"
                      // aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      // viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="line">
                <img src="./images/category_images/line.png"></img>
              </div>

              {/* <div className="add-cart">
                <a href="#">
                  <img src="./images/category_images/add-to-cart.png"></img>
                </a>
              </div> */}
            </div>
            {/* Search-bar end */}

            <div className="col-md-4 my-auto">
              <ul className="nav justify-content-end gap-x-2">
                {token === null && (
                  <Link to="/login">
                    <button className="auth-btn">Log In</button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button className="auth-btn-filled">Sign Up</button>
                  </Link>
                )}
                {token !== null && (
                  <Link to="/cart">
                    {/* <button className="auth-btn">Dashboard</button> */}
                    <a href="#"><div className="add-cart">
                  <img className="w-10 h-9 me-2 rounded-full" src="./images/category_images/add-to-cart.png"></img>
                  </div></a>

                  </Link>
                )}
                {token !== null && (
                 
                    <UserDropdown/>
                 
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <NavSec />
    </div>
  );
}
export default Navbar;
