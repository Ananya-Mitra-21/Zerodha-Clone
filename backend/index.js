if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3002;
const DB_URL = process.env.MONGO_URL;

app.use(bodyParser.json());

// ✅ CORS for frontend and dashboard
app.use(cors({
  origin: [
    "https://zerodha-clone-frontend-l5bb.onrender.com",
    "https://zerodha-clone-dashboard-c3kb.onrender.com"
  ],
  credentials: true
}));

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("JWT Backend is running ✅");
});

// ✅ DB connection
mongoose.connect(DB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ DB Error:", err));


