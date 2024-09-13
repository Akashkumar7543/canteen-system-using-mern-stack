const express = require("express");
const {
  CreateProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  loginAdmin,
  getaProductBycategroy,
  GetRecentProducts,
} = require("../controllers/productCrtl");
const { auth, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", CreateProduct);
router.post("/wishlist", auth, addToWishlist);
router.get("/:id", getaProduct);
// router.get("/", getAllProduct);

router.put("/:id", auth, isAdmin, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);
router.post("/rating", auth, rating);
router.post("/admin-login", loginAdmin);
router.get("/products", getaProductBycategroy);
router.get("/", GetRecentProducts);
module.exports = router;
