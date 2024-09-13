import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";

import { useState } from 'react';
import Chatbot from './components/chatbot/Chatbot';
import "./components/core/Styles.css";

import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Vendors from "./pages/Vendors";

import { useSelector } from "react-redux";

import Cart from "./Component/Cart.js";
import Newarivail from "./pages/Newarivail";
import Ourproduct from "./components/core/HomePage/Ourproduct.js";
import UserProfilee from "./components/common/UserProfilee.js";
import ProfilePage from "./components/common/ProfilePage.js";
import MainUserProfile from "./components/common/MainUserProfile.js";
import OrderHistory from "./components/common/OrderHistory.js";
import Transactions from "./components/common/Transactions.js";
import OrderDorpdown from "./components/common/OrderDorpdown.js";

import AddMoney from "./components/common/AddMoney.js";
import Messenger from "./components/chatbot/Messenger.js";





function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const {token} = useSelector( (state) => state.auth );

  return (
    
    
  
    
    <div className="flex flex-col">
       
      {/* <Router> */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element= {<Home isLoggedIn={isLoggedIn}/>} />
        <Route path="/home" element= {<Home isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="verify-email" element = <VerifyEmail /> />
        <Route path="/ecommerce" element = { <Home /> } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element = { <Orders /> } />
        <Route path="/vendors" element = { <Vendors /> } />
        <Route path="/customers" element = { <Customers /> } />
        <Route path="/newarival" element = { <Newarivail/> } />
        <Route path="/ourprodut" element = { <Ourproduct/> } />
        <Route path="/" element = { <UserProfilee/> } />
        <Route path="/profile" element = { <ProfilePage/> } />
        <Route path="/userprofile" element = { <MainUserProfile/> } />
        <Route path="/Orderhistory" element = { <OrderHistory/> } />
        <Route path="/transactionsans" element = { <Transactions/> } />
        <Route path="/OrderDorpdown" element = { <OrderDorpdown/> } />
        <Route path="/NexusWallet" element = { <AddMoney/> } />
        <Route path="/Messger" element = { <Messenger/> } />

       
        

        
        {/* <Route path="/cart" element = { <Cart/> } /> */}
       


    
       
        
        
        <Route path="/dashboard" element = {
          (
            token !== null && <Dashboard/>
          )
        } />
      </Routes>
      {/* </Router> */}
      <div>
        <Chatbot />
      </div>
    </div>
    
    
  );
}

export default App;