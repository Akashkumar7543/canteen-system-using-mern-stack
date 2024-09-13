import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NexusWallte() {
  const [userId, setUserId] = useState('123'); // Example user ID
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/wallet/${userId}`)
      .then(response => setWallet(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  const createOrder = () => {
    axios.post('http://localhost:4000/api/payment/order', { amount: parseFloat(amount), userId })
      .then(response => {
        openPaytm(response.data);
      })
      .catch(error => console.error("Order Creation Error:", error));
  };

  const openPaytm = (orderData) => {
    const config = {
      root: '',
      flow: 'DEFAULT',
      data: {
        orderId: orderData.ORDER_ID,
        token: orderData.CHECKSUMHASH,
        tokenType: 'CHECKSUM',
        amount: orderData.TXN_AMOUNT,
      },
      handler: {
        notifyMerchant: (eventName, data) => {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config).then(() => {
        window.Paytm.CheckoutJS.invoke();
      });
    }
  };

  return (
    <div className="App">
      <h1>Wallet System</h1>
      {wallet && (
        <div>
          <p>Balance: {wallet.balance}</p>
          <ul>
            {wallet.transactions.map((txn, index) => (
              <li key={index}>{txn.type}: {txn.amount} on {new Date(txn.date).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={createOrder}>Add Money via UPI</button>
      </div>
    </div>
  );
}

export default NexusWallte;
