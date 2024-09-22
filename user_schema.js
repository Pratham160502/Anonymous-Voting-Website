const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const obj = new Schema({
  email: String,
  username: String,
  password: String,
});
const database = mongoose.model("user_data", obj);
module.exports = database;
