var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  titles: { type: String, required: true, unique: true },
  option1: { type: String },
  option2: { type: String  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.title = function() {
  return this.titles;
};

var User = mongoose.model("User", userSchema);

module.exports = User;