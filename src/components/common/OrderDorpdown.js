import React from "react";
import "./OrderDorpdown.css";
const OrderDorpdown = () => {
  return (
    <div class="containerfsd mt-5">
      <div class="row ml-4">
        <div class="col-6 col-md-2 ">
          <div className="sidebar">
            <h2 class="font-bold">Filters</h2>
            <div className="filter-group mt-4">
              <h3>Order Status</h3>
              <label>
                <input type="checkbox" /> On the way
              </label>
              <label>
                <input type="checkbox" /> Delivered
              </label>
              <label>
                <input type="checkbox" /> Cancelled
              </label>
              <label>
                <input type="checkbox" /> Returned
              </label>
            </div>
            <div className="filter-group">
              <h3>Order Time</h3>
              <label>
                <input type="checkbox" /> Last 30 days
              </label>
              <label>
                <input type="checkbox" /> 2023
              </label>
              <label>
                <input type="checkbox" /> 2022
              </label>
              <label>
                <input type="checkbox" /> 2021
              </label>
              <label>
                <input type="checkbox" /> 2020
              </label>
              <label>
                <input type="checkbox" /> Older
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-8 ">
          <div className="search-barl ml-9">
            <input
              type="text"
              placeholder="Search your orders here"
              style={{ borderRadius: "20px" }}
            />
            <button
              type="button"
              className="btn btn-outline-success ml-"
              style={{ borderRadius: "20px" }} // Adjust as needed for roundness
            >
              Search Orders
            </button>
          </div>
          <div className="order-item ml-9">
            <div className="order-header">
              <div class="containersc">
                <div class="row">
                  <div class="col">
                    <div className="coll">
                      <img
                        src="./images/category_images/pngegg (1).png"
                        alt="fv"
                        width={"150px"}
                        height={"150px"}
                        className="product-image mt-4 mb-4"
                      ></img>
                    </div>
                  </div>
                  <div class="col">
                    <span class="mt-3">Pesties Sewstobery </span>
                  </div>
                  <div class="col">
                    <span class="mt-3">Rs 233</span>
                   
                  </div>
                  <div class="col">
                  <div className="order-status">
                      <span className="status-dot "></span>

                      <span class="mt-1 ml-2">Refund completed</span>
                      

                    </div>
                    <p class="resion mt-1 small-text ">As per Your Request, Your item has been Cancelled</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-refuend-info">
              <h2 class="Refundcomp ml-4">Refund completed (Refund Id: CR23456367854324F4235)</h2>
              <div className="order-status">
                      <span className="statuss-dot ml-3 mt-4"></span>

                      <span class="resion mt-3 ml-2">This Money was added into your bank Account on 23 May 2024. For any quries please contact your bank reference number YESBNK2133487</span>
                      

                    </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDorpdown;
