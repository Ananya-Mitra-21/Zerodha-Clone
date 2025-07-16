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

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const app = express();

// ✅ CORS setup for React frontend
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // React app URL
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Session setup
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};

app.use(session(sessionOptions));

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

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

app.get("/auth/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// ✅ Demo route (optional)
app.get("/demouser", async (req, res) => {
  try {
    let fakeUser = new User({
      email: "student@gmail.com",
      username: "delta-student"
    });
    let registeredUser = await User.register(fakeUser, "helloworld");
    res.json(registeredUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Holdings & Positions routes
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
    mode: req.body.mode,
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
