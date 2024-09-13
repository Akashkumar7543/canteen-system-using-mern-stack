import React, { useEffect, useState } from "react";

import UserProfileSlide from './UserProfileSlide'
import { fetchAllOrders } from "../../slices/ProfileeSlice";

const Transactions = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadOrders = async () => {
        try {
          const recentOrders = await fetchAllOrders();
          setOrders(recentOrders);
        } catch (error) {
          setError("Failed to load orders");
        } finally {
          setLoading(false);
        }
      };
  
      loadOrders();
    }, []);
  return (
    <div class="containerr mt-4 mb-5">
    <div class="row">
      <div class="col-4">
        <UserProfileSlide />
      </div>
      <div class="col-6">
        <div className="cont mt-4 rounded">
          <div className="row justify-content-center rounded-full  border-b-1 ">
          
            <div>
              <div class="content">
                <p className="font-b text-x text-black-500 dark:text-gray-400  mt-3">
                  Hello, {localStorage.getItem("firstName")}{" "}
                  {localStorage.getItem("lastName")}{" "} <br></br>Transactions page
                </p>
              </div>
              <div className="section mt-2 ml-4">
                <h2 className="mt-5">
                  Transactions<span className="edit"></span>
                </h2>
               
               
              </div>
              {orders.length === 0 ? (
              <p>No recent orders found.</p>
            ) : (
              orders.map((order) => (
                <div className="orderr containere-sm mb-3" key={order._id}>
               
               
               
                 
                <div className="row">
                 
                  <div className="mt-2 col-6 col-md-4">
                    
                  </div>
                </div>
           
                <div>
                
                  {order.products.map(({ product, count }) => (
                    <div className="container mb-" key={product._id}>
                      <div className="row">
                        <div className="cold">
                        
                        </div>
                        <div className="col mr-5 mt-4">
                        <h1
                            className="mb-3"
                            style={{
                              marginTop: "2px",
                              fontSize: "17px",
                              fontFamily: "Arial, sans-serif",
                              color:"green"
                            }}
                          >
                            Transactions Id: {order.paymentIntent.id}
                          </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "2px",
                              fontSize: "17px",
                              fontFamily: "Arial, sans-serif",
                              fontWeight:"bold"
                            }}
                          >
                            Product Name: {product.title}
                          </h1>
                          <h1
                         className="mb-3"
                         style={{
                           marginTop: "2px",
                           fontSize: "17px",
                           fontFamily: "Arial, sans-serif",
                         }}
                        >
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "8px",
                              fontSize: "17px",
                              fontFamily: "Arial, sans-serif",
                              color: "grey",
                            }}
                          >
                          Method: {order.paymentIntent.method}
                          </h1>
                          <h1
                            className="mb-3"
                            style={{
                              marginTop: "8px",
                              fontSize: "16px",
                              fontFamily: "Arial, sans-serif",
                              color:"#b12a2a"
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
                             Total Paid: Rs {order.paymentIntent.amount}
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
      </div>
    </div>
  </div>
  )
}

export default Transactions
