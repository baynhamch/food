const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resReviewSchema = new Schema({
  comment: String,
  score: Number,
  username: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const RestaurantSchema = new Schema(
  {
    title: String,
    address: String,
    website: String,
    menu: String,
    phoneNumber: String,
    cover: String,
    comments: [resReviewSchema],
    score: Number,
  },
  { timestamps: true }
);

const RestaurantModel = model("Restaurant", RestaurantSchema);

module.exports = RestaurantModel;
