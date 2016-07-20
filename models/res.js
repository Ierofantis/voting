var mongoose = require("mongoose");

var formSchema = mongoose.Schema({
  titles: { type: String },
  option1: { type: String },
  option2: { type: String  },
  createdAt: { type: Date, default: Date.now }
});

formSchema.methods.title = function() {
  return this.titles;
};

var Form = mongoose.model("Form", formSchema);

module.exports = Form;
