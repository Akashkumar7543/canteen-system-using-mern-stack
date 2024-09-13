const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendotp,
  getallUser,


} = require("../controllers/Auth")

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.get("/getAllUser", getallUser);




module.exports = router