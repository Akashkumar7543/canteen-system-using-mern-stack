const { message } = require("antd");
const Product = require("../models/productModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId")
const User = require("../models/User")
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
//CREATE PRODUCT
const CreateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id); // Assuming you're using params for ID
  try {
 // Validate MongoDB ID format (if using a custom validator)
    
    // Example: Creating a new product
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Server Error' }); // Return an appropriate error response
  }
});

//UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract id directly from req.params
  validateMongoDbId(id); // Uncomment this if you have a validation function
  
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
//DELET PRODUCT
  const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract id directly from req.params
    validateMongoDbId(id); 
    try {
      const deleteProduct = await Product.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  
//GET PRODUCT BY ID
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const findProduct = await Product.findById(id);
      res.json(findProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

//GET ALL PRODUCT
const getAllProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
      
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });
  const getAllMainProduct = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
      const limit = 4; 
      const page = req.query.page;
      // const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  });
  
//addToWishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { prodId } = req.body;
  
    // Log the incoming request for debugging
    console.log('User ID:', id);
    console.log('Product ID:', prodId);
  
    try {
      const user = await User.findById(id);
  
      // Check if the user was found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the product is already in the wishlist
      const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
  
      let updatedUser;
      if (alreadyAdded) {
        // Remove product from wishlist
        updatedUser = await User.findByIdAndUpdate(
          id,
          {
            $pull: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
      } else {
        // Add product to wishlist
        updatedUser = await User.findByIdAndUpdate(
          id,
          {
            $push: { wishlist: prodId },
          },
          {
            new: true,
          }
        );
      }
  
      // Send the updated user data in the response
      res.json(updatedUser);
  
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });
  
  //rating
  const rating = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { star, prodId, comment } = req.body;
  
    // Log the incoming request for debugging
    console.log('User ID:', id);
    console.log('Product ID:', prodId);
    console.log('Star:', star);
    console.log('Comment:', comment);
 
    try {
      const product = await Product.findById(prodId);
      console.log('Product found:', product);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === id.toString()
      );
  
      if (alreadyRated) {
        await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
      } else {
        await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
  
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
  
      res.json(finalproduct);
  
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });

  // Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
  // admin login

  const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    
    if (!findAdmin) {
      throw new Error("User not found");
    }
  
    console.log("Found user:", findAdmin); // Debugging line
  
    if (findAdmin.accountType !== "Admin") {
      throw new Error("Not Authorised");
    }
  
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstName,
        lastname: findAdmin?.lastName,
        email: findAdmin?.email,
        
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });
  
  const getaProductBycategroy  = asyncHandler(async (req, res) => {
    try {
      const { category } = req.query;
      const products = await Product.find({ category });
      res.json(products);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  const GetRecentProducts = asyncHandler(async (req, res) => {
    try {
      // Get the most recent 4 products
      const products = await Product.find().sort({ createdAt: -1 }).limit(4);
      res.status(200).json(products);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: 'Server Error' }); // Return an appropriate error response
    }
  });



module.exports = {CreateProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, loginAdmin, updatedUser, getaProductBycategroy,GetRecentProducts };
