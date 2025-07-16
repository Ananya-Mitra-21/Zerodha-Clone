const express = require("express");
const passport = require("passport");
const User = require("../model/user");

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ message: "Signup successful", user: registeredUser });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful", user: req.user });
});

// ✅ LOGOUT
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid"); // ✅ Optional: Clear cookie manually
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// ✅ CHECK SESSION
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;



