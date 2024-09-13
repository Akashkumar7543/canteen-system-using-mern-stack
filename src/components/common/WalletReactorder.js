import React, { useEffect, useState } from "react";
import "./profile.css";

import { fetchRecentWallteOrders } from "../../slices/ProfileeSlice";
import UserProfileSlide from "./UserProfileSlide";


const WalletReactorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const recentOrders = await fetchRecentWallteOrders();
        setOrders(recentOrders);
      } catch (error) {
        setError("Shop Now");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="man">
      <div className="row g-0">
        {/* <UserProfileSlide /> */}
        
          <div class="containeer2 mt- -2">
           
            <h1
              className="mb-3 "
              style={{
                marginTop: "8px",
                fontSize: "32px",
                fontFamily: "Arial, sans-serif",
              }}
            >
            
            </h1>
            {orders.length === 0 ? (
              <p>No recent orders found.</p>
            ) : (
              orders.map((order) => (
                <div className="order container-sm mb-3" key={order._id}>
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
                    fontSize: "15px",
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
                    <div className="container mb-4" key={product._id}>
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
          </div>
        </div>
      </div>
   
  );
};

export default WalletReactorder;
