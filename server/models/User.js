// Import the Mongoose library
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Schema } = mongoose;

// Define the user schema using the Mongoose Schema constructor
const transactionDetailsSchema = new Schema({
  id: { type: String },
  method: { type: String },
  invoiceDate: { type: String },
  dueDate: { type: String },
  datePaid: { type: String },
});

// Define a schema for transactions
const transactionSchema = new Schema({
  id: { type: Number, required: false },
  amount: { type: Number, required: true },
  Quickamount: { type: Number },
  type: { type: String, required: true },
  orderId: { type: String, required: true },
  date: { type: Date, default: Date.now },

  description: { type: String },
  paymentMethod: { type: String },
  status: { type: String, default: "Pending" },
  transactionId: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: { type: String },
  SenderFirstname: { type: String },
  SenderLastname: { type: String },
  ReciverFirstname: { type: String },
  ReciverLastname: { type: String },
  mode: { type: String },
  name: { type: String },
  time: { type: String },
  method: { type: String },
  details: { type: transactionDetailsSchema },
});
const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: { type: String, required: true, unique: true },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
      type: String,
      enum: ["Admin", "Customer", "Vendor"],
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    walletBalance: { type: Number, default: 0 },
    transactionHistory: [transactionSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
      required: true,
    },
    // Add timestamps for when the document is created and last modified
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) {
// 	  next();
// 	}
// 	const salt = await bcrypt.genSaltSync(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
//   });
  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
  };
//   userSchema.methods.createPasswordResetToken = async function () {
// 	const resettoken = crypto.randomBytes(32).toString("hex");
// 	this.passwordResetToken = crypto
// 	  .createHash("sha256")
// 	  .update(resettoken)
// 	  .digest("hex");
// 	this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
// 	return resettoken;
//   };
// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);
