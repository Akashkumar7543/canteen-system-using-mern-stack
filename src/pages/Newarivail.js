import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductPopup from '../components/core/HomePage/ProductPopup';
import '../components/core/Styles.css';
import Clebarte from './Clebarte';
import FireworkEffect from './FireworkEffect';

const Newarivail = (props) => {
  const { heading } = props;
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [zoomLevels, setZoomLevels] = useState([]);
  const [mousePositions, setMousePositions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/product/');
        console.log(response.data);
        setProducts(response.data);
        setZoomLevels(response.data.map(() => 1));
        setMousePositions(response.data.map(() => ({ x: 0, y: 0 })));
      } catch (error) {
        console.error('Error fetching products:', error);
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
    newMousePositions[index] = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setMousePositions(newMousePositions);
  };


  return (
    <div className="customm-container  mx-auto">
     
        
     <div>
      
      <h2 className="mt-3" style={{ fontSize: '3rem' }}>New Launches <FireworkEffect/></h2>
      
    </div>

      <div className="newlaunchs-section-22 mt-4 grid grid-cols-4 gap-4">
    
        {products.map((product, productIndex) => (
          <div key={productIndex}>
            <div className="card" onClick={() => handleCardClick(product)}>
              <div className="rating">
                <span className="rating-value">{product.totalrating}</span>
              </div>
              <div className="product">
                {product.images.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={image.url}
                    alt={product.title}
                    width={"250px"}
                    height={"260px"}
                    className="product-image"
                    style={{
                      transform: `scale(${zoomLevels[productIndex]})`,
                      transformOrigin: mousePositions[productIndex]
                        ? `${mousePositions[productIndex].x}px ${mousePositions[productIndex].y}px`
                        : 'center center',
                    }}
                    onMouseEnter={() => handleMouseEnter(productIndex)}
                    onMouseLeave={() => handleMouseLeave(productIndex)}
                    onMouseMove={(e) => handleMouseMove(productIndex, e)}
                  />
                ))}
                <div className="product-details">
                  <span className="product-type">{product.title}</span>
                  <p className="product-description mt-2">{product.description}</p>
                </div>
              </div>
              <div className="price">
                <span className="sale-price">RS {product.price}</span>
                <div className="offers">
                  <span className="actual-price">Rs 200{product.actualPrice}</span>
                  <span className="discount">54% {product.discount}</span>
                  <Clebarte/>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-6 mb-6 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mr-9"
                    style={{ marginLeft: "59px", marginTop: "-20px" }}
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

export default Newarivail;
