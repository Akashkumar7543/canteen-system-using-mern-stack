import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductPopup from "./ProductPopup";
import "../Styles.css";
import { toast } from "react-hot-toast";
const Product = (props) => {
  const { heading } = props;
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [zoomLevels, setZoomLevels] = useState([]);
  const [mousePositions, setMousePositions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/product"
        );
        console.log(response.data);
        setProducts(response.data);
        setZoomLevels(response.data.map(() => 1));
        setMousePositions(response.data.map(() => ({ x: 0, y: 0 })));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null); // Reset selectedProduct
  };

  const handleMouseEnter = (index) => {
    const newZoomLevels = [...zoomLevels];
    newZoomLevels[index] = 1.5;
    setZoomLevels(newZoomLevels);
  };

  const handleMouseLeave = (index) => {
    const newZoomLevels = [...zoomLevels];
    newZoomLevels[index] = 1;
    setZoomLevels(newZoomLevels);
  };

  const handleMouseMove = (index, e) => {
    const newMousePositions = [...mousePositions];
    newMousePositions[index] = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    setMousePositions(newMousePositions);
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      toast.error("Please Login");
      return;
    }

    const cartItem = {
      _id: product._id,
      count: 1,
      color: "default",
      title: product.title, // or any other logic for color
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/order/cart",
        { cart: [cartItem] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Product Added Successfully");
    } catch (error) {
      toast.error("Error adding product to cart:", error);
      if (error.response) {
        console.error("Backend responded with:", error.response.data);
        alert(
          `Error: ${
            error.response.data.message || "Could not add product to cart"
          }`
        );
      } else {
        toast.error("Error adding product to cart");
      }
    }
  };

  return (
    <div className="custom-containerrr product w-10/10 mx-auto">
      <div className="product-section-1">
        <h3 style={{ color: "black", fontSize: "2em" }}>{heading}</h3>
      </div>
      <div className="product-section-22">
        {products.map((product, productIndex) => (
          <div key={productIndex}>
            <div className="card">
              <div className="rating">
                <span className="rating-value">{product.totalrating}</span>
              </div>
              <div className="product" onClick={() => handleCardClick(product)}>
                {product.images.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image.url}
                    alt={product.title}
                    width={"250px"}
                    height={"260px"}
                    className="product-image mb-2"
                    style={{
                      transform: `scale(${zoomLevels[productIndex]})`,
                      transformOrigin: mousePositions[productIndex]
                        ? `${mousePositions[productIndex].x}px ${mousePositions[productIndex].y}px`
                        : "center center",
                    }}
                    onMouseEnter={() => handleMouseEnter(productIndex)}
                    onMouseLeave={() => handleMouseLeave(productIndex)}
                    onMouseMove={(e) => handleMouseMove(productIndex, e)}
                  />
                ))}
                <div className="product-details">
                  <span className="product-type">{product.title}</span>
                  <p className="product-description mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="price">
                <span className="sale-price">RS {product.price}</span>
                <div className="offers">
                  <span className="actual-price">
                    Rs 200{product.actualPrice}
                  </span>
                  <span className="discount"> 54% {product.discount}</span>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-6 mb-6 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mr-9"
                    style={{ marginLeft: "59px", marginTop: "-20px" }}
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            {isPopupOpen && selectedProduct === product && (
              <ProductPopup product={product} onClose={handleClosePopup} />
            )}
          </div>
        ))}
       
      </div>
      {isPopupOpen && selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Product;
