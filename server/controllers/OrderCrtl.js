const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Cart = require("../models/CartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const uniqid = require("uniqid");
const Coupon = require("../models/couponModel");
const jwt = require("jsonwebtoken");

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { id } = req.user;
  validateMongoDbId(id);

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  try {
    const user = await User.findById(id);
    let existingCart = await Cart.findOne({ orderby: user.id });

    if (existingCart) {
      // Update the existing cart with new products
      for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const existingProduct = existingCart.products.find(
          (p) => p.product.toString() === cartItem._id
        );

        if (existingProduct) {
          existingProduct.count += cartItem.count;
        } else {
          const product = await Product.findById(cartItem._id).exec();
          existingCart.products.push({
            product: cartItem._id,
            count: cartItem.count,
            color: cartItem.color,
            price: product.price,
            title: product.title,
            description: product.description,
            images: product.images,
          });
        }
      }
    } else {
      // Create a new cart if none exists
      existingCart = new Cart({
        orderby: user.id,
        products: [],
      });

      for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const product = await Product.findById(cartItem._id).exec();
        existingCart.products.push({
          product: cartItem._id,
          count: cartItem.count,
          color: cartItem.color,
          price: product.price,
          title: product.title,
          description: product.description,
          images: product.images,
        });
      }
    }

    // Calculate the cart total
    let cartTotal = 0;
    for (let i = 0; i < existingCart.products.length; i++) {
      cartTotal +=
        existingCart.products[i].price * existingCart.products[i].count;
    }
    existingCart.cartTotal = cartTotal;

    await existingCart.save();

    res.json(existingCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  // Validate the coupon
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (!validCoupon) {
    return res.status(400).json({ message: "Invalid Coupon" });
  }

  // Get the user's cart
  const user = await User.findById(_id);
  let cart = await Cart.findOne({ orderby: user._id }).populate(
    "products.product"
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  let { cartTotal } = cart;
  let discount = validCoupon.discount || 0;

  // Check if the discount is a percentage or a fixed amount
  let totalAfterDiscount = cartTotal - discount;

  // Ensure totalAfterDiscount is not negative
  if (totalAfterDiscount < 0) {
    totalAfterDiscount = 0;
  }

  // Update the cart with the new total
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json({ totalAfterDiscount });
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "Rs",
      },
      orderby: user._id,
      paymentMethod: "Cash on Delivery",
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { id: item.product },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ orderby: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.deleteOne({ orderby: userId }); // Clear the user's cart
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    console.log("Request object:", req);
    console.log("Response object:", res);

    if (!res || typeof res.status !== "function") {
      throw new Error("Response object is not defined properly.");
    }

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(3) // Limit the result to 3 documents
      .populate("products.product") // Populate product details
      .populate("orderby"); // Populate user details

    res.status(200).json(recentOrders);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ message: "Failed to fetch recent orders", error });
  }
};
const getRecentOrdersForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user

    if (!userId) {
      return res.status(400).json({ message: "User ID is not provided" });
    }

    // Optional query parameter to filter by wallet orders
    const { walletOnly } = req.query;

    let query = { orderby: userId };
    if (walletOnly) {
      query.paymentMethod = "Wallet"; // Only fetch wallet orders if walletOnly is true
    }

    const recentOrders = await Order.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(1) // Limit the result to 3 documents
      .populate("products.product") // Populate product details
      .populate("orderby"); // Populate user details

    if (recentOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(recentOrders);
  } catch (error) {
    console.error("Error fetching recent orders for user:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch recent orders for user", error });
  }
};
const getRecentWallteOrdersForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from req.user

    if (!userId) {
      return res.status(400).json({ message: "User ID is not provided" });
    }

    // Optional query parameter to filter by wallet orders
    const { walletOnly } = req.query;

    let query = { orderby: userId };
    if (walletOnly) {
      query.paymentMethod = "Wallet"; // Only fetch wallet orders if walletOnly is true
    }

    const recentOrders = await Order.find({ userId })
    .limit(1) // Limit the result to 3 documents
      .populate("products.product")
      .populate("userId")
      .sort({ createdAt: -1 }); // Populate user details

    if (recentOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(recentOrders);
  } catch (error) {
    console.error("Error fetching recent orders for user:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch recent orders for user", error });
  }
};
const getAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ orderby: userId })
      .populate("products.product")
      .sort({ createdAt: -1 })
      .populate("orderby");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getAllwalltesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("products.product")
      .populate("userId")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  clearCart,
  getRecentOrders,
  getRecentOrdersForUser,
  getAllOrdersByUser,
  getAllwalltesByUser,
  getRecentWallteOrdersForUser,
};
