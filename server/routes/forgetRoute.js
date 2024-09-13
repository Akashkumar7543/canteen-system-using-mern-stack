const express = require("express");

const router = require("./productRoute");
const {
  forgotPasswordToken,
  resetPassword,
  updatePassword,
} = require("../controllers/fogetPass");
const { auth } = require("../middlewares/auth");


router.post("/forget", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", auth,updatePassword);

module.exports = router;
