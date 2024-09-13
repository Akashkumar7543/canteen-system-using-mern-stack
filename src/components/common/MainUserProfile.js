import React, { useEffect, useState } from "react";
import { fetchRecentOrders } from "../../slices/ProfileeSlice";
import "./Mainprofile.css";

import UserProfileSlide from "./UserProfileSlide";
import "./profile.css";
const MainUserProfile = () => {
  return (
    <div class="containerr mt-4 mb-5 rounded">
      <div class="row">
        <div class="col-4">
          <UserProfileSlide />
        </div>
        <div class="col-6">
          <div className="cont mt-4 rounded">
            <div className="row justify-content-center">
              <img
                className="rounded-full h-40 w-40 ml-9 mt-9"
                src="./images/category_images/userpic.jpg"
                alt="user-profile"
              />
              <div>
                <div class="content">
                  <p className="font-b text-x text-black-500 dark:text-gray-400  mt-3">
                    Hello, {localStorage.getItem("firstName")}{" "}
                    {localStorage.getItem("lastName")}{" "}
                  </p>
                </div>
                <div className="section mt-2 ml-4">
                  <h2 className="mt-5">
                    Personal Information <span className="edit">Edit</span>
                  </h2>
                  <div className="input-group mt-5 mb-5">
                    <input
                      type="text"
                      value={localStorage.getItem("firstName")}
                      readOnly
                    />
                    <input
                      type="text"
                      value={localStorage.getItem("lastName")}
                      readOnly
                    />
                  </div>
                  <div className="gender-group mt-3 ml-2 mb-5">
                    <label>Your Gender</label>
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        disabled
                      />
                      <label htmlFor="male">Male</label>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        disabled
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="section mt-1 ml-4 mb-5">
                  <h2>
                    Email Address <span className="edit">Edit</span>
                  </h2>
                  <div className="input-group mt-5 mb-5">
                    <input
                      type="text"
                      value={localStorage.getItem("email")}
                      readOnly
                      className="small-input"
                     
                    />
                  </div>
                </div>
                <div className="section ml-4 mb-4">
                  <h2>FAQs</h2>
                  <p>
                    <strong>
                      What happens when I update my email address (or mobile
                      number)?
                    </strong>
                  </p>
                  <p>
                    Your login email id (or mobile number) changes, likewise.
                    You'll receive all your account related communication on
                    your updated email address (or mobile number).
                  </p>
                  <p className="mt-3">
                    <strong>
                      When will my Nexus account be updated with the new email
                      address (or mobile number)?
                    </strong>
                  </p>
                  <p>
                    It happens as soon as you confirm the verification code sent
                    to your email (or mobile) and save the changes.
                  </p>
                  <p className="mt-3">
                    <strong class="font-bold">
                      What happens to my existing Nexus account when I update my
                      email address (or mobile number)?
                    </strong>
                  </p>
                  <p>
                    Updating your email address (or mobile number) doesn't
                    invalidate your account. Your account remains fully
                    functional. You'll continue seeing your Order history, saved
                    information and personal details.
                  </p>
                </div>
                <div className="mb-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary ml-5"
                    style={{ borderRadius: "20px" }} // Adjust as needed for roundness
                  >
                    Deactivate Account
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger ml-5"
                    style={{ borderRadius: "20px" }} // Adjust as needed for roundness
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainUserProfile;
