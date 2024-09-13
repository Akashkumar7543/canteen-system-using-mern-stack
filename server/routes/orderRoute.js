const express = require("express");
const {
  createOrder,
  userCart,
  getOrders,
  getAllOrders,
  getOrderByUserId,
  getUserCart,
  applyCoupon,
  clearCart,
  getRecentOrders,
  getRecentOrdersForUser,
  getAllOrdersByUser,
  getAllwalltesByUser,
  getRecentWallteOrdersForUser,
} = require("../controllers/OrderCrtl");
const { protect } = require("../middlewares/protect");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

// router.post("/cart", userCart);
router.post("/cart", protect, userCart);
router.post("/cart/createorder", protect, createOrder);
router.get("/getoder", protect, getOrders);
router.get("/getalloder", protect, getAllOrders);
router.get("/getoder/:id", getOrderByUserId);
router.get("/getCart", protect, getUserCart);
router.post("/getorderbyuser/:id", getAllOrders);

router.post("/applyCoupon", protect, applyCoupon);
router.delete("/clearCart", protect, clearCart);
router.get("/recent-orders", getRecentOrders); //admin
router.get("/recent-user", protect, getRecentOrdersForUser);
router.get("/getallOrderUser", protect, getAllOrdersByUser);
router.get("/getallWallteOrderUser", protect, getAllwalltesByUser);
router.get("/recent-user_wallte", protect, getRecentWallteOrdersForUser);

module.exports = router;
