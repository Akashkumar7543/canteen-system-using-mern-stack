import React from 'react';
import './UserDetails.css';

const UserDetails = ({ payment }) => {
  const { transactionId, paymentMethod, date, time, amount, method, status, userEmail,description,ReciverFirstname, ReciverLastname, SenderFirstname, SenderLastname,mode } = payment;

  return (
    <div className="transaction-container">
      <div className="transaction-card">
        <div className="transaction-header">
          <h2>Transaction Successful!</h2>
          <div className="transaction-icon">&#10003;</div>
        </div>
        <div className="transaction-details">
        
         
          <div className="detail-item">
            <span className="label">{mode}:</span>
            <span className="value">{ReciverFirstname} {ReciverLastname}{SenderFirstname} {SenderLastname}</span>
          </div>
          <div className="detail-item">
            <span className="label">Transaction Id :</span>
            <span className="value">{transactionId}</span>
          </div>
          <div className="detail-item">
            <span className="label">Description :</span>
            <span className="value">{description}</span>
          </div>
          <div className="detail-item">
            
            <span className="label">Amount :</span>
            <span className="value">Rs {amount}</span>
          </div>
          <div className="detail-item">
            <span className="label">User Email :</span>
            <span className="value">{userEmail}</span>
          </div>
        
          <div className="detail-item">
            <span className="label">Payment Method :</span>
            <span className="value">{paymentMethod}</span>
          </div>
         
          <div className="detail-item">
            <span className="label">Date :</span>
            <span className="value">{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">Time :</span>
            <span className="value">{time}</span>
          </div>
          <div className="detail-item">
            <span className="label">Status :</span>
            <span className="value">{status}</span>
          </div>
          <div className="transaction-footer">
            <span className="footer-text"> The Transaction is Processed. Successful!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
