const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asynHandler = require("express-async-handler");

const createCoupon = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupons = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = asynHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Ensure this function correctly validates MongoDB ObjectId
  
    console.log('Request ID:', id);
    console.log('Request Body:', req.body);
  
    try {
      const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true, // This ensures that the updated document adheres to the schema
      });
  
      if (!updatecoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      console.log('Updated Coupon:', updatecoupon);
      res.json(updatecoupon);
    } catch (error) {
      console.error('Error updating coupon:', error);
      res.status(500).json({ message: 'Error updating coupon' });
    }
  });
const deleteCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getCoupon = asynHandler(async (req, res) => {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    validateMongoDbId(id);
  
    // Log the request details for debugging
    console.log('Request ID:', id);
    console.log('Request Body:', req.body);
  
    try {
      // Attempt to find the coupon by ID
      const getAcoupon = await Coupon.findById(id);
  
      // Log the query result
      console.log('Query Result:', getAcoupon);
  
      // Check if the coupon was found
      if (!getAcoupon) {
        res.status(404).json({ message: "Coupon not found" });
        return;
      }
  
      // Send the coupon as a response
      res.json(getAcoupon);
    } catch (error) {
      console.error('Error fetching coupon:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};