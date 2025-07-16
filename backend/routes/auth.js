const express = require("express");
const passport = require("passport");
const User = require("../model/user.js");

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ error: "Auto login after signup failed" });
      res.status(201).json({ message: "Signup successful", user: registeredUser });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// ✅ LOGOUT
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
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


