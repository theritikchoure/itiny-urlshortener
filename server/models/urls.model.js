const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("URL", URLSchema);
