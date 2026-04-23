const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("File", fileSchema);