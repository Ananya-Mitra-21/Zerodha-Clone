const express = require("express");
const router = express.Router();
const User = require("../model/user");

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ message: "Signup successful", user: registeredUser });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
