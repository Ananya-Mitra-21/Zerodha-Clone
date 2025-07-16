const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ✅ ensures no duplicate usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ ensures no duplicate emails
  },
});

userSchema.plugin(passportLocalMongoose); // ✅ Adds password hashing and auth helpers

module.exports = mongoose.model("User", userSchema);


