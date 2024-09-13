const Category = require("../models/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params; // Extract id directly from req.params
    validateMongoDbId(id); // Uncomment this if you have a validation function
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  
  const { id } = req.params; // Extract id directly from req.params
  validateMongoDbId(id);  // Uncomment this if you have a validation function
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      validateMongoDbId(id); // Uncomment if you have a validation function
  
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json(category);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
const getallCategory = asyncHandler(async (req, res) => {
    try {
        
      const getallCategory = await Category.find();
      res.json(getallCategory);
    } catch (error) {
      throw new Error(error);
    }
  });
  
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};