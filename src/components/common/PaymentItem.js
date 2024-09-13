import React from 'react';
import './PaymentItem.css';

const PaymentItem = ({ payment, onClick }) => {
  // Function to determine the style class for the amount based on payment type
  const getAmountClass = (type) => {
    return type.toLowerCase() === 'credit' ? 'credit' : 'debit';
  };

  return (
    <div className="payment-item mb-4" onClick={onClick}>
      <div className="payment-info mb-">
        <div className="payment-name mb-2 fs-5 font-bold">{payment.paymentMethod}</div>
        <div className="payment-name mb-2 fs-6 font-bold">To {payment.ReciverFirstname} {payment.ReciverLastname}{payment.SenderFirstname} {payment.SenderLastname} {payment.name}</div>
        <div className="payment-name mb-2 fs-5 font-bold"> </div>
        <div className="payment-date">{new Date(payment.date).toLocaleString()}</div>
        <div className="payment-time mt-1">{payment.time}</div>
      </div>
      <div className={`payment-amount ${getAmountClass(payment.type)}`}>
        {payment.amount}
      </div>
      <div className={`payment-method ${getAmountClass(payment.type)}`}>
        {payment.type}
      </div>
      <div className={`payment-status ${payment.status.toLowerCase()}`}>
        {payment.status}
      </div>
    </div>
  );
};

export default PaymentItem;
