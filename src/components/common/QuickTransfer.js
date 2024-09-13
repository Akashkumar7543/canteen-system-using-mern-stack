import React, { useState, useEffect } from "react";
import "./QuickTransfer.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import { data } from "autoprefixer";


const QuickTransfer = () => {
  

  const [active, setActive] = useState("Monthly");

  const handleClick = (value) => {
    setActive(value);
  };
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({
    visible: false,
    type: "", // "loading", "success", "error"
    message: ""
  });
  const [walletDetails, setWalletDetails] = useState({
    walletBalance: 0,
    transactionHistory: [],
  });

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/auth/getAllUser"
        );
        setUsers(response.data.users);
        setVisibleUsers(response.data.users);
        console.log(response.data.users) // Adjust number of visible users as needed
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    // Filter users based on search query
    const filteredUsers = users.filter(
      (user) =>
        user.username &&
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVisibleUsers(filteredUsers.slice(0, 5)); // Adjust number of visible users as needed
  }, [searchQuery, users]);
  const handlePrev = () => {
    const newIndex = Math.max(scrollIndex - 1, 0);
    setScrollIndex(newIndex);
    setVisibleUsers(users.slice(newIndex, newIndex + 5)); // Adjust slice range as needed
  };

  const handleNext = () => {
    const newIndex = Math.min(scrollIndex + 1, users.length - 5);
    setScrollIndex(newIndex);
    setVisibleUsers(users.slice(newIndex, newIndex + 5)); // Adjust slice range as needed
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = async () => {
    if (!selectedUser || !amount) {
     
      toast.error("Please select a user and enter an amount.");
      return;
    }
    const senderUsername = localStorage.getItem("username");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/wallet/tranfer-monye",
        {
          senderUsername: senderUsername, // Replace with the sender's username
          recipientUsername: selectedUser.username,
          amount: parseFloat(amount),
        }
      );
     

      if (response.data.success) {
     
        toast.success("Transfer successfull");
        window.location.reload(); 
      } else {
     
        toast.error("Transfer failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Insufficient balance", );
   
      toast.error("Insufficient balance " );
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd'); // Formats to "2024-08-01"
  };
  const CreditIcon = () => (
    <svg
      width="63"
      height="63"
      className="mb-3 ml-1"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.00002"
        y="1"
        width="61"
        height="61"
        rx="29"
        stroke="#2BC155"
        stroke-width="2"
      ></rect>
      <g clip-path="url(#clip0)">
        <path
          d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
          fill="#2BC155"
        ></path>
        <path
          d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
          fill="#2BC155"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="matrix(-4.37114e-08 1 1 4.37114e-08 17 17)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
  const DebitIcon = () => (
    <svg
      width="63"
      height="63"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="61"
        height="61"
        rx="29"
        stroke="#FF2E2E"
        stroke-width="2"
      ></rect>
      <g clip-path="url(#clip1)">
        <path
          d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
          fill="#FF2E2E"
        ></path>
        <path
          d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
          fill="#FF2E2E"
        ></path>
      </g>
      <defs>
        <clipPath id="clip1">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="translate(17 45) rotate(-90)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
  const getAmountClass = (type) => {
    return type.toLowerCase() === 'credit' ? 'credit' : 'debit';
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate the transactions to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = walletDetails.transactionHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(walletDetails.transactionHistory.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (
    <div className="quick-transfer-container ">
      <div className="quick-transfer-card">
        <div className="quick-transfer-header">
          <h4 className="fs-20 text-black font-bold">Quick Transfer</h4>
          <p>Quick Transfer Into Your Friend Wallet Account......</p>
         
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username"
            className="rounded-pill block w-80 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="quick-transfer-users-container mt-5">
          <button className="scroll-btn" onClick={handlePrev}>
            <svg
              className="w-6 h-8 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 10 16"
            >
              <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
            </svg>
          </button>
          <div className="quick-transfer-users">
            <div
              className={`quick-transfer-users ${
                showScrollbar ? "show-scrollbar" : ""
              }`}
            >
              {visibleUsers.map((user) => (
                <div
                  className={`user ${selectedUser === user ? "selected" : ""}`}
                  key={user.username}
                  onClick={() => handleUserSelect(user)}
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <div className="mt-3">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="username mt-1 mb-3">@{user.username}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="scroll-btn" onClick={handleNext}>
            <svg
              className="w-6 h-8 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 10 16"
            >
              <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
            </svg>
          </button>
        </div>
        <div className="quick-transfer-footer">
          <div className="row">
            <div className="col-8">
              <input
                type="number"
                placeholder="Amount"
                className="form-control rounded-pill mb-3"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="col-4">
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="transactions-card">
        <div className="transactions-header">
          <h4 className="fs-3 text-black font-bold"> Previous Transactions</h4>
          <p className="fs-30 font-bold mb-4">
            Your Quick Transfer Previous Transaction{" "}
          </p>
          <div className="button-group mb-9">
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
        </div>
        <div>
      <div className="transactions-list mt-4 mb-3">
        {currentTransactions.length > 0 ? (
          currentTransactions.map((payment) => (
            <div className="transaction mt-3 mb-3" key={payment._id}> {/* Use a unique key if available */}
              {payment.type === "Credit" ? <CreditIcon /> : <DebitIcon />}
              <div className="transaction-details">
                <div className="transaction-name ml-3 mt-2 fs-5 font-bold">
                  {payment.ReciverFirstname} {payment.ReciverLastname} {payment.SenderFirstname} {payment.SenderLastname} {payment.name}
                </div>
              </div>
              <div className="transaction-date-time mb-3 font-bold">
                {formatDate(payment.date)} , {payment.time}
              </div>
              <div className={`payment-amount ${getAmountClass(payment.type)}`}>
                ₹{payment.amount}
              </div>
              <div className={`transaction-status mb-3 ${payment.status.toLowerCase()}`}>
                {payment.status}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p className="no-payment-historye">No transactions available.</p>
        )}
      </div>
      
      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} class="mr-3 btn btn-outline-secondary rounded-pill">
          Previous
        </button>
        <span>
          Page {currentPage} of   {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} class="btn btn-outline-secondary rounded-pill ml-3">
          Next
        </button>
      </div>
    </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
