import React from 'react';
import "./ordersmp.css"
const OrderSummaryPopup = ({
  cart,
  discountedTotal,
  selectedPaymentMethod,
  onClose,
  handleWalletPayment,
  handlePayment,
  handleCOD,
}) => {
  const calculateTotal = () => {
    const cartTotal = cart.products.reduce((total, item) => total + item.price * item.count, 0);
    return discountedTotal || cartTotal;
  };

  const handlePayNow = () => {
    if (selectedPaymentMethod === "wallet") {
      handleWalletPayment();
    } else if (selectedPaymentMethod === "upi") {
      handlePayment();
    } else if (selectedPaymentMethod === "cod") {
      handleCOD();
    }
    onClose(); // Close the popup after handling payment
  };

  // Define button text based on selected payment method
  const getButtonText = () => {
    switch (selectedPaymentMethod) {
      case "wallet":
        return "Pay with Wallet";
      case "upi":
        return "Pay with UPI";
      case "cod":
        return "Pay with COD";
      default:
        return "Pay Now";
    }
  };

  return (
    <div className="popup-overlay">
    <div className="popup-content">
      <h3>Order Summary</h3>
    
    <ul>
          {cart.products.map((item) => (
             <tr key={item._id}>
             <td>
               <figure className="itemside align-items-center mt-4">
                 <div className="aside">
                   <img
                     src={item.images[0].url}
                     className="img-sm"
                     alt={item.title}
                   />
                 </div>
                 <figcaption className="infos">
                   <a href="#" className="titles text-black">
                     {item.title}
                   </a>
                  
                   <p className="decp text-black small">
                     Description: {item.description}
                   </p>
                   <a className="qnt text-black">
                    Quantity: {item.count}
                   </a>
                 </figcaption>
               </figure>
             </td>
            
            
           </tr>
          ))}
        </ul>
  
   
   
    <p className="qntt text-black mt-4">Subtotal: Rs. {calculateTotal()}</p>
        <p className="qntt text-black">Shipping: Rs. 20</p>
        <p className="qntt text-black">Total: Rs. {calculateTotal() + 20}</p>
        <button 
          onClick={handlePayNow} 
          className="qntt text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {getButtonText()}
        </button>
        
        <button 
          onClick={onClose} 
          className="qntt text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Close
        </button>


    </div>
  </div>

   
  );
};

export default OrderSummaryPopup;
