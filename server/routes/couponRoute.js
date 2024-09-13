const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controllers/Addcouponcrtl");
const router = express.Router();

router.post("/",  createCoupon);
router.get("/",  getAllCoupons);
router.get("/:id",  getCoupon);
router.put("/:id",  updateCoupon);
router.delete("/:id",  deleteCoupon);

module.exports = router;
