const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const obj = new Schema({
  title: String,
  yes: Number,
  no: Number,
  voted_user:[]
});
const database = mongoose.model("vote", obj);
module.exports = database;
