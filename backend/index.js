if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./model/user");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3002;
const DB_URL = process.env.MONGO_URL;

// ✅ Middleware
app.use(bodyParser.json());

// ✅ CORS configuration for frontend + dashboard
const corsOptions = {
  origin: [
    "https://zerodha-clone-frontend-l5bb.onrender.com",
    "https://zerodha-clone-dashboard-c3kb.onrender.com"
  ],
  credentials: true // ✅ Allow cookies
};
app.use(cors(corsOptions));

// ✅ Session configuration for Render cross-subdomain
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in production
    sameSite: "none", // ✅ Required for cross-site cookies
    domain: ".onrender.com", // ✅ Allows session cookie across frontend & dashboard
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
};
app.use(session(sessionOptions));

// ✅ Passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Database connection and server start
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));

