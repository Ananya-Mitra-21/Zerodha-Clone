if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { PositionsModel } = require("./model/PositionsModel");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const app = express();

// ✅ Allowed origins (local + deployed)
const allowedOrigins = [
  "http://localhost:3000", // Frontend
  "http://localhost:3001", // Dashboard
  "https://your-frontend.onrender.com",
  "https://your-dashboard.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Auth Routes
app.post("/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Signup successful", user: registeredUser });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

app.get("/auth/check", (req, res) => {
  res.json({ loggedIn: req.isAuthenticated(), user: req.user || null });
});

// ✅ Fixed Logout (clears session + cookie)
app.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

// ✅ Sample routes
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode
  });
  await newOrder.save();
  res.send("Order saved!");
});

// ✅ Start server & connect DB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongoose.connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection failed:", err));
});


