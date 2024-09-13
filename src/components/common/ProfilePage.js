import React, { useEffect, useState } from "react";
import "./profile.css";
import Footer from "./Footer";
import { fetchRecentOrders } from "../../slices/ProfileeSlice";
import UserProfileSlide from "./UserProfileSlide";
import WalletReactorder from "./WalletReactorder";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const recentOrders = await fetchRecentOrders();
        setOrders(recentOrders);
      } catch (error) {
        setError("No orders are placed.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min">
      <div className="row g-">
        <UserProfileSlide />

        <div className="col-sm-6 col-md-8 mb-4">
          <div className="container2 mt-4 -2">
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6 mb-3">
              <img
                className="rounded-full h-24 w-24"
                src="./images/category_images/userpic.jpg"
                alt="user-profile"
              />
              <div>
                <p className="font-semibold text-xl text-black-500 dark:text-gray-400">
                  Name: {localStorage.getItem("firstName")}{" "}
                  {localStorage.getItem("lastName")}{" "}
                </p>
                <p className="text-gray-500 text-sm dark:text-green-400">
                  Account Type: {localStorage.getItem("accountType")}{" "}
                </p>
                <p className="text-gray-500 text-sm font-semibold dark:text-gray-400 mr-4">
                  Email: {localStorage.getItem("email")}{" "}
                </p>
              </div>
            </div>
            <div className="containersd">
              <div className="row">
                <div className="col">
                  <h2 className="mb-3">Address 1</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <p className="mt-2">
                    Akash kumar (332) PEARL REGENCY, AG Cooperative Colony,
                    Kadru, Ashok Nagar Ranchi, JHARKHAND 834002 India
                  </p>
                </div>
                <div className="col">
                  <h2 className="mb-3">Address 2</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <p className="mt-2">
                    Akash kumar (332) PEARL REGENCY, AG Cooperative Colony,
                    Kadru, Ashok Nagar Ranchi, JHARKHAND 834002 India
                  </p>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className=" mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Add New Address
                  </button>
                </div>
              </div>
            </div>
            <hr className="mt-3"></hr>
            <h1
              className="mb-3"
              style={{
                marginTop: "8px",
                fontSize: "32px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Recent Orders
            </h1>
            {loading ? (
              <p>Loading recent orders...</p>
            ) : error ? (
              <p>{error}</p>
            ) : orders.length === 0 ? (
              <p>No recent orders found.</p>
            ) : (
              orders.map((order) => (
                <div className="order container-sm mb-3 bg-white rounded" key={order._id}>
                <h2
                  style={{
                    marginTop: "8px",
                    fontSize: "22px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Order Id: {order._id}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    color: "green",
                  }}
                >
                  Status: {order.orderStatus}
                </p>
                <p
                  style={{
                    marginTop: "8px",
                    marginLeft: "3px",
                    fontSize: "19px",
                    fontFamily: "sans-serif",
                    color: "gray",
                  }}
                >
                  Order Method: {order.paymentMethod}
                </p>
                <p
                  style={{
                    marginTop: "8px",
                    marginLeft: "3px",
                    fontSize: "19px",
                    fontFamily: "sans-serif",
                    color: "gray",
                  }}
                >
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="row">
                  <div className="col-6 col-md-4">
                    <button
                      type="button"
                      className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Track Order
                    </button>
                  </div>
                  <div className="mt-2 col-6 col-md-4">
                    <button
                      type="button"
                      className="mr-9 mt-1 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
                <hr className="mt-3 mb-3"></hr>
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p
                          style={{
                            marginTop: "8px",
                            fontSize: "13px",
                            fontFamily: "sans-serif",
                            color: "gray",
                          }}
                        >
                          Shipping Address
                        </p>
                        <p className="mt-2">
                          Akash Kumar (332) PEARL REGENCY, AG Cooperative
                          <br></br> Colony, Kadru, Ashok Nagar Ranchi,
                          JHARKHAND 834002 India
                        </p>
                      </div>
                      <div className="vertical-line col ml-9">
                        <p
                          className="ml-9"
                          style={{
                            marginTop: "8px",
                            fontSize: "13px",
                            fontFamily: "sans-serif",
                            color: "gray",
                          }}
                        >
                          Payment
                        </p>
                        <h1
                          className="ml-9"
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          Method: {order.paymentIntent.method}
                        </h1>
                        <h1
                          className="ml-9"
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </h1>
                        <h1
                          className="ml-9"
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          Shipping Fee: Rs 20
                        </h1>
                        <h1
                          className="ml-9"
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                            color: "green",
                          }}
                        >
                          Total Paid: Rs {order.paymentIntent.amount}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-3 mb-4"></hr>
                  {order.products.map(({ product, count }) => (
                    <div className="container mb-" key={product._id}>
                      <div className="row">
                        <div className="col">
                          <img
                            src={product.images[0]?.url}
                            alt={product.title}
                            width={"150px"}
                            height={"150px"}
                            className="product-image mt-4 mb-4"
                          ></img>
                        </div>
                        <div className="col mr-5 mt-4">
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "2px",
                              fontSize: "17px",
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            Name: {product.title}
                          </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "8px",
                              fontSize: "14px",
                              fontFamily: "Arial, sans-serif",
                              color: "grey",
                            }}
                          >
                            Description: {product.description}
                          </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "8px",
                              fontSize: "16px",
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            Quantity: {count}
                          </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "8px",
                              fontSize: "16px",
                              fontFamily: "Arial, sans-serif",
                              color: "green",
                            }}
                          >
                            Price: Rs {product.price}
                          </h1>
                        </div>
                      </div>
                      <hr className="mt-3"></hr>
                     
                    </div>
                    
                  ))}
                   
                </div>
                
              </div>
              
              ))
            )}
            <div>
                    
                          <WalletReactorder />
                       
                    
                  </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProfilePage;
