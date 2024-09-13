import React from "react";
import "../core/Styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div>
      <div className="footer-areea">
        <div className="custom-container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-logo">
                <img src="./images/category_images/logo.png"></img>
              </div>
              <div className="footer-underline"></div>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading text-white">Quick Links</h4>
              <div className="footer-underline"></div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Home
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  About Us
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Contact Us
                </a>
              </div>

              <div className="mb-2">
                <a href="" className="text-white">
                  Sitemaps
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading text-white">Shop Now</h4>
              <div className="footer-underline"></div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Collections
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Trending Food
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  New Arrivals Food
                </a>
              </div>

              <div className="mb-2">
                <a href="" className="text-white">
                  Cart
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="footer-heading text-white">Reach Us</h4>
              <div className="footer-underline"></div>
              <div className="mb-2">
                <p>
                  <i className="fa fa-map-marker"></i> #444,Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry,
                  India - 560077
                </p>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  <i className="fa fa-phone"></i> +91 989-XXX-XXXX
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  <i className="fa fa-envelope"></i>amitycantennexus@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[14px] py-[50px] bg-richblack-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">
              {" "}
              &copy; 2024 - Amity Canteen - Nexus. All rights reserved.
            </p>
            <p className="text-white">Developed  by Akash</p>
          </div>
          <div className="mr-10">
            <div className="flex self-end float-right text-white">
              Get Connected:
              <div className="ml-4 flex gap-x-4">
                <a
                  href="https://www.youtube.com/your-channel-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>

                <a
                  href="https://www.facebook.com/your-page-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://www.instagram.com/your-profile-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.twitter.com/your-profile-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
