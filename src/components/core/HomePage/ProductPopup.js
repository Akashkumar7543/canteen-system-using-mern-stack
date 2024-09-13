// ProductPopup.js
import React from "react";
import axios  from "axios"
import { toast } from "react-hot-toast"

const addToCart = async (product) => {
  const token = localStorage.getItem('token');
  console.log(token);

  if (!token) {
   toast.error("Please Login")
    return;
  }

  const cartItem = {
    _id: product._id,
    count: 1,
    color: 'default',
    title: product.title, // or any other logic for color
  };

  try {
    const response = await axios.post(
      'http://localhost:4000/api/v1/order/cart',
      { cart: [cartItem] },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);
    toast.success("Product Added Successfully")
  } catch (error) {
    toast.error('Error adding product to cart:', error);
    if (error.response) {
      console.error('Backend responded with:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Could not add product to cart'}`);
    } else {
      toast.error("Error adding product to cart")
     
    }
  }
};
const ProductPopup = ({ product, onClose }) => {
  
  if (!product) return null; // Ensure product is not null before rendering

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-product-details">
          <h2>{product.title}</h2>
          {/* <div className="product"> */}
                {product.images.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image.url}
                    alt={product.title} />
                  ))}
          <p className="mt-4 mb-3">{product.description}</p>
          <div className="popup-price">
            <h3 className="sale-price mt-2" style={{ fontWeight: 'bold' }} >Rs {product.price}</h3>
            <span className="actual-price" style={{ fontWeight: 'bold' }} >RS 200{product.actualPrice}</span>
            <span className="discount" style={{ fontWeight: 'bold' }} > 88%{product.discount}</span>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              style={{ marginLeft: "110px" }}
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
