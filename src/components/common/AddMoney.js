import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import "./wallet.css";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import QuickTransfer from "./QuickTransfer";
import PaymentItem from "./PaymentItem";
import UserDetails from "./UserDetails";
import { CSSTransition } from "react-transition-group";
import "./PaymentHistory.css";
import "./UserDetails.css";
import Celebrate from "../../pages/Celebrate";

const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [walletDetails, setWalletDetails] = useState({
    walletBalance: 0,
    transactionHistory: [],
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showCelebrate, setShowCelebrate] = useState(false); // State for Celebrate component
  const [active, setActive] = useState("Monthly");

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
  };

  const handleClick = (value) => {
    setActive(value);
  };

  const data = [
    { value: 20 },
    { value: 30 },
    { value: 50 },
    { value: 40 },
    { value: 70 },
    { value: 60 },
    { value: 80 },
    { value: 70 },
  ];

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

  useEffect(() => {
    if (userId) {
      const fetchWalletDetails = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/wallet/${userId}`
          );
          setWalletDetails(data);
        } catch (error) {
          console.error("Error fetching wallet details:", error);
        }
      };
      fetchWalletDetails();
    }
  }, [userId]);

  const handleAddMoney = async () => {
    if (!userId) {
      toast.error("User ID not found.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/wallet/add-money",
        { userId, amount }
      );
      const options = {
        key: "rzp_test_YkjUOMagr2LMMH",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        handler: async (response) => {
          const paymentData = {
            userId,
            amount,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(
            "http://localhost:4000/api/wallet/verify-payment",
            paymentData
          );

          toast.success("Money added successfully!");
        // window.location.reload(); 

        setShowCelebrate(true); // Show Celebrate component on success

          const updatedDetails = await axios.get(
            `http://localhost:4000/api/wallet/${userId}`
          );
          setWalletDetails(updatedDetails.data);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error adding money:", error);
    }
  };

  return (
    <div>
      <div className="form-head mb-4 mt-3">
        <h2 className="text-black font-w600 mb-0 ml-9">Nexus Wallet</h2>
      </div>

      <div className="containerwe ml-5 mt-4">
        <div className="walletSection bg-white">
          <div className="row align-items-center ">
            <div className="col mt-3 mb-3">
              <div className="d-flex align-items-center ml-9">
                <svg
                  className="me-3"
                  width="68"
                  height="68"
                  viewBox="0 0 68 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M59.4999 31.688V19.8333C59.4999 19.0818 59.2014 18.3612 58.6701 17.8298C58.1387 17.2985 57.418 17 56.6666 17H11.3333C10.5818 17 9.86114 16.7014 9.32978 16.1701C8.79843 15.6387 8.49992 14.9181 8.49992 14.1666C8.49992 13.4152 8.79843 12.6945 9.32978 12.1632C9.86114 11.6318 10.5818 11.3333 11.3333 11.3333H56.6666C57.418 11.3333 58.1387 11.0348 58.6701 10.5034C59.2014 9.97208 59.4999 9.25141 59.4999 8.49996C59.4999 7.74851 59.2014 7.02784 58.6701 6.49649C58.1387 5.96514 57.418 5.66663 56.6666 5.66663H11.3333C9.07891 5.66663 6.9169 6.56216 5.32284 8.15622C3.72878 9.75028 2.83325 11.9123 2.83325 14.1666V53.8333C2.83325 56.0876 3.72878 58.2496 5.32284 59.8437C6.9169 61.4378 9.07891 62.3333 11.3333 62.3333H56.6666C57.418 62.3333 58.1387 62.0348 58.6701 61.5034C59.2014 60.9721 59.4999 60.2514 59.4999 59.5V47.6453C61.1561 47.0683 62.5917 45.9902 63.6076 44.5605C64.6235 43.1308 65.1693 41.4205 65.1693 39.6666C65.1693 37.9128 64.6235 36.2024 63.6076 34.7727C62.5917 33.3431 61.1561 32.265 59.4999 31.688ZM53.8333 56.6666H11.3333C10.5818 56.6666 9.86114 56.3681 9.32978 55.8368C8.79843 55.3054 8.49992 54.5847 8.49992 53.8333V22.1453C9.40731 22.4809 10.3658 22.6572 11.3333 22.6666H53.8333V31.1666H45.3333C43.0789 31.1666 40.9169 32.0622 39.3228 33.6562C37.7288 35.2503 36.8333 37.4123 36.8333 39.6666C36.8333 41.921 37.7288 44.083 39.3228 45.677C40.9169 47.2711 43.0789 48.1666 45.3333 48.1666H53.8333V56.6666ZM56.6666 42.5H45.3333C44.5818 42.5 43.8611 42.2015 43.3298 41.6701C42.7984 41.1387 42.4999 40.4181 42.4999 39.6666C42.4999 38.9152 42.7984 38.1945 43.3298 37.6632C43.8611 37.1318 44.5818 36.8333 45.3333 36.8333H56.6666C57.418 36.8333 58.1387 37.1318 58.6701 37.6632C59.2014 38.1945 59.4999 38.9152 59.4999 39.6666C59.4999 40.4181 59.2014 41.1387 58.6701 41.6701C58.1387 42.2015 57.418 42.5 56.6666 42.5Z"
                    fill="#1EAAE7"
                  ></path>
                </svg>
                <div className="me-auto ml-4">
                  <h5 className="manibalance fs-20 text-black font-w600">
                    Main Balance
                  </h5>
                  <span
                    className="text-num text-green font-w600"
                    style={{ fontSize: "1.6rem", color: "green" }}
                  >
                    Rs {walletDetails.walletBalance}
                  </span>
                </div>
              </div>
            </div>
            <div className="col mb-3">
              <p className="fs-14 mb-1">WALLET HOLDER</p>
              <span className="text-black font-bold">
                {localStorage.getItem("firstName")}{" "}
                {localStorage.getItem("lastName")}
              </span>
            </div>
            <div className="col mb-3">
              <p className="fs-14 mb-1">Username</p>
              <span className="text-black font-bold">
                {localStorage.getItem("username")}
              </span>
            </div>
          </div>
        </div>

        <div className="gj">
          <div className="row">
            <div className="addmonye col mt-4">
              <h2 className="text-black font-w600 mb-0 ml-9 mt-5">
                Add Money{" "}
              </h2>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="mt-4 ml-9">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="rounded-pill bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style={{ width: "270px", height: "35px", fontSize: "14px" }}
                  />
                </div>
                <div className="btnre mt-4">
                  <button
                    onClick={handleAddMoney}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Add Money
                  </button>
                </div>
              </div>
            </div>

            <div className="addmonye col mt-4">
              <div className="wallet-usage-card">
                <div className="wallet-usage-text">
                  <div>
                    <h4 className="mb-4 mr-3 mt-4">Weekly Wallet Usage</h4>
                    <div className="wallet-usage-stats">
                      <span className="wallet-usage-percentage">▲ </span>
                      <span
                        className="percent font-bold mr-3 ml-1"
                        style={{ fontSize: "1.5rem", color: "black" }}
                      >
                        43%{" "}
                      </span>
                      <span> Than last week</span>
                    </div>
                  </div>
                  <div className="wallet-usage-increase">
                    <span>▲ 4% (30 days)</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <AreaChart data={data}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="quicktrasf mt-4 ml-9">
              <QuickTransfer />
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4">
          <div className="col">
            <div className="payment-history ml-3">
              <h4 className="fs-3 text-black font-bold">Payment History</h4>
              <p className="font-semibold mt-3 mb-4">
                Your Wallet Payment History
              </p>
              <div className="button-groupp mb-9">
                {["Monthly", "Weekly", "Today"].map((value) => (
                  <button
                    key={value}
                    className={`button ${active === value ? "active" : ""}`}
                    onClick={() => handleClick(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="payment-list">
              <div className="payment-history-container">
      {walletDetails.transactionHistory.length === 0 ? (
        <p className="no-payment-history">No payment history available.</p>
      ) : (
        walletDetails.transactionHistory.map((payment) => (
          <PaymentItem
            key={payment.id}
            payment={payment}
            onClick={() => handlePaymentClick(payment)}
            isSelected={selectedPayment === payment}
          />
        ))
      )}
    </div>
                <CSSTransition
                  in={!!selectedPayment}
                  timeout={300}
                  classNames="user-details-transition"
                  unmountOnExit
                >
                  <div className="popup">
                    <div className="popup-inner">
                      {selectedPayment && (
                        <UserDetails payment={selectedPayment} />
                      )}
                      <button
                        className="close-button "
                        onClick={() => setSelectedPayment(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CSSTransition
        in={showCelebrate}
        timeout={300}
        classNames="celebrate-transition"
        unmountOnExit
      >
        <Celebrate />
      </CSSTransition>
    </div>
  );
};

export default AddMoney;
