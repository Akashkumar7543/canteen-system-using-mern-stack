import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

import Footer from "../components/common/Footer";
import "../Appp.css";
import axios from "axios";
import toast from "react-hot-toast";
import OrderSummaryPopup from "./OrderSummaryPopup";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [userId, setUserId] = useState(null);

  const [couponApplied, setCouponApplied] = useState("");
  const [showPopup, setShowPopup] = useState(false);

 
  

  useEffect(() => {
    const fetchCartDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You need to log in first");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/order/getCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(response.data);
        setDiscountedTotal(
          response.data.totalAfterDiscount || response.data.cartTotal
        );
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching cart details:", error);
        setError("Your cart is empty or there was No items are added");
        setCart(null); // Clear cart data on error
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    console.log("Item ID:", id, "New Quantity:", quantity); // Debugging
    const updatedItems = cart.products.map((item) =>
      item._id === id ? { ...item, count: quantity } : item
    );
    setCart({ ...cart, products: updatedItems });
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cart.products.filter((item) => item._id !== id);
    setCart({ ...cart, products: updatedItems });
  };

  const calculateTotal = () => {
    const cartTotal = cart.products.reduce((total, item) => total + item.price * item.count, 0);
    return discountedTotal || cartTotal;
  };

  const applyCoupon = async () => {
    try {
      const couponUrl = "http://localhost:4000/api/v1/order/applyCoupon";
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to log in first");
        return;
      }

      const { data } = await axios.post(
        couponUrl,
        { coupon: couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDiscountedTotal(data.totalAfterDiscount);
      toast.success("Coupon applied successfully!");

      // Optionally, fetch updated cart details if other cart properties are impacted
      const response = await axios.get(
        "http://localhost:4000/api/v1/order/getCart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data);
    } catch (error) {
      toast.error("Failed to apply coupon");
      console.error(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_YkjUOMagr2LMMH",
      amount: data.amount,
      currency: data.currency,
      name: "Amity Nexus",
      description: "Test Transaction",
      image: "./images/category_images/DS (1).png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:4000/api/payment/verify";
          const token = localStorage.getItem("token");
          if (!token) {
            toast.error("You need to log in first");
            return;
          }
          const { data: verifyData } = await axios.post(verifyUrl, response, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          toast.success("Payment Successful, Order Created!");
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/payment/orders";
      const amount = Math.round(calculateTotal()); // Convert amount to paise (integer)

      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        orderUrl,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      initPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCOD = async () => {
    setLoading(true); // Show loader
    try {
      const codUrl = "http://localhost:4000/api/v1/order/cart/createorder";
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to login first");
        return;
      }
  
      // Place the order
      const { data } = await axios.post(
        codUrl,
        {
          COD: true,
          couponApplied: !!couponCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Remove items from the cart
      await axios.delete("http://localhost:4000/api/v1/order/clearCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update the UI
      setCart({ products: [] }); // Clear the cart in the UI
  
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Order creation failed");
      console.error(error);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token not found in local storage.");
    }
  }, []);
  const handleWalletPayment = async ( couponApplied) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You need to login first");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/wallet/orderWallte', {
        userId,
        couponApplied: couponApplied
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      toast.success('Order placed successfully!');
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      toast.error(`Error placing order with wallet: ${error.response ? error.response.data.message : error.message}`);
      console.error('Error placing order with wallet:', error);
    }
    await axios.delete("http://localhost:4000/api/v1/order/clearCart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update the UI
    setCart({ products: [] }); 
  };

  const handlePayNowClick = () => {
    // Show the popup with the order summary
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <h1 className="item-center">{error}</h1>;
  }
  return (
    <div>
      <div className="shopping-cart">
        <div className="shopping-background">
          <div className="row">
            <div className="shopping-cart1 col-8">
              <div className="table-responsive">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120" className="text-center">
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-right d-none d-md-block"
                        width="200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <figure className="itemside align-items-center">
                            <div className="aside">
                              <img
                                src={item.images[0].url}
                                className="img-sm"
                                alt={item.title}
                              />
                            </div>
                            <figcaption className="info">
                              <a href="#" className="title text-dark">
                                {item.title}
                              </a>
                              <p className="text-muted small">
                                Description: {item.description}
                              </p>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <select
                            className="form-control"
                            value={item.count}
                            onChange={(e) =>
                              handleQuantityChange(item._id, +e.target.value)
                            }
                          >
                            {[...Array(10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <div className="price-wrap text-center">
                            <h2 className="price">Rs {item.price}</h2>
                          </div>
                        </td>
                        <td className="text-center d-none d-md-block">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="container2 mt-3">
              <div>
                <h5>Shipping Address</h5>
                <hr />
                <p className="mt-3">
                  Akash kumar (332) PEARL REGENCY, AG Cooperative Colony, Kadru,
                  Ashok Nagar Ranchi, JHARKHAND 834002 India
                </p>
                <button
                  type="button"
                  className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Change Address
                </button>
              </div>

              <h5 className="mt-3">Order Summary</h5>
              <hr />

              <div className="containerefe-inside mt-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button onClick={applyCoupon} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-3 mt-1">
                  Apply Coupon
                </button>
              </div>
              <div className="container2-inside mt-1">
                <p>Subtotal</p>
                <p>Rs. {calculateTotal()}</p>
              </div>
              <div className="container2-inside mt-1">
                <p>Shipping</p>
                <p>Rs. 20</p>
              </div>
              <div className="container2-inside mt-1">
                <p className="bold-text">Total</p>
                <p className="bold-text">Rs. {calculateTotal() + 20}</p>
              </div>
              <div className="container2d-inside mt-3">
  <div>
    <input
      type="radio"
      id="wallet"
      name="paymentMethod"
      value="wallet"
      checked={selectedPaymentMethod === "wallet"}
      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
    />
    <label htmlFor="wallet" className="ml-2">Pay with Wallet</label>
  </div>

  <div className="mt-2">
    <input
      type="radio"
      id="upi"
      name="paymentMethod"
      value="upi"
      checked={selectedPaymentMethod === "upi"}
      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
    />
    <label htmlFor="upi" className="ml-2">Pay with UPI</label>
  </div>

  <div className="mt-2">
    <input
      type="radio"
      id="cod"
      name="paymentMethod"
      value="cod"
      checked={selectedPaymentMethod === "cod"}
      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
    />
    <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
  </div>

  <div className="container2d-inside mt-3">
  <button
        onClick={handlePayNowClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5 mr-5"
      >
        Pay Now
      </button>

      {showPopup && (
        <OrderSummaryPopup
          cart={cart}
          discountedTotal={discountedTotal}
          selectedPaymentMethod={selectedPaymentMethod}
          onClose={closePopup}
          handleWalletPayment={handleWalletPayment}
          handlePayment={handlePayment}
          handleCOD={handleCOD}
        />
      )}
    </div>
</div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
