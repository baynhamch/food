const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  comment: String,
  score: {
    type: Number,
    required: true,
  },
  username: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const mediaSchema = new Schema({
  publicationName: String,
  blerb: String,
  mediaLink: String,
});

const FoodSchema = new Schema(
  {
    dish: { type: String, required: true },
    restaurant: String,
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    cover: Array,
    rating: Number,
    price: Number,
    category: String,
    summary: String,
    comments: [reviewSchema],
    media: [mediaSchema],
    tried: Boolean,
    favorite: Boolean,
    averageScore: Number,
  },
  { timestapms: true }
);

// FoodSchema.pre("save", function (next) {
//   const totalScore = this.comments.reduce(
//     (sum, comment) => sum + comment.score,
//     0
//   );
//   this.averageScore = totalScore / this.comments.length;
//   next();
// });

const FoodModel = model("Food", FoodSchema);

module.exports = FoodModel;
