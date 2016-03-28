var mongoose  = require("mongoose"),
    passLocal = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passLocal);

module.exports = mongoose.model("User", userSchema);