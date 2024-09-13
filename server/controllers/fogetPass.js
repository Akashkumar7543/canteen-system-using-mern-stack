const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const { generateToken } = require("../config/jwtToken");
const sendEmail = require("./emailCtrl");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
	const cookie = req.cookies;
	if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
	const refreshToken = cookie.refreshToken;
	const user = await User.findOne({ refreshToken });
	if (!user) throw new Error(" No Refresh token present in db or not matched");
	jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
	  if (err || user.id !== decoded.id) {
		throw new Error("There is something wrong with refresh token");
	  }
	  const accessToken = generateToken(user?._id);
	  res.json({ accessToken });
	});
  });
  const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
  
    console.log(`Received user ID: ${_id}`); // Log the ID
    console.log(`Received password: ${password}`); // Log the password
  
    try {
      validateMongoDbId(_id); // Validate the ID format
  
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`); // Log the error
      res.status(400).json({ message: error.message });
    }
  });
  
  
  
  const forgotPasswordToken = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw new Error("User not found with this email");
	try {
	  const token = await user.createPasswordResetToken();
	  await user.save();
	  const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:4000/api/v1/reset-password/${token}'>Click Here</>`;
	  const data = {
		to: email,
		text: "Hey User",
		subject: "Forgot Password Link",
		htm: resetURL,
	  };
	  sendEmail(data);
	  res.json(token);
	} catch (error) {
	  throw new Error(error);
	}
  });
  
  const resetPassword = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const { token } = req.params;
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	const user = await User.findOne({
	  passwordResetToken: hashedToken,
	  passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) throw new Error(" Token Expired, Please try again later");
	user.password = password;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	res.json(user);
  });
  module.exports = {handleRefreshToken, updatePassword, forgotPasswordToken, resetPassword,}