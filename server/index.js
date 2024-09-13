const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const Razorpay = require('razorpay');

const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const paymentRoutes = require("./routes/payment");
const productRoutes = require("./routes/productRoute");
const forgetpass = require("./routes/forgetRoute")
const categoryRoute = require("./routes/prodcategoryRoute");
const orderRoute = require("./routes/orderRoute");
const couponRoute = require("./routes/couponRoute");
const Product = require("./models/prodcategoryModel")
const walletRoutes =require("./routes/walletRoutes")




dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ msg: 'Category is required' });
    }
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Addproduct
// Routes


// Routes
// API endpoint to get all products


// login with google
require("dotenv").config();

require("./config/database");

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/userSchema");
const { protect } = require("./middlewares/protect");

const clientid =
  "247441077068-r3j860vu8kfrql87qe7hrgqmie5i1m3o.apps.googleusercontent.com";
const clientsecret = "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";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// setup session
app.use(
  session({
    secret: "shhhh",
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google ouath login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});
// login with google

// database connect
database.connect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFile: true,
    tempFileDir: "/tmp",
  })
);

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/payment/", paymentRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/categeory", categoryRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/coupon", couponRoute);
// Dummy wallet data

app.use("/api/v1/", forgetpass);
// app.use("/api/v1/category", categoryRoute);

//paytm
app.use('/api/wallet', walletRoutes);














// def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// activate server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
