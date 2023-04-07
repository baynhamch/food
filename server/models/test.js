const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  averageScore: {
    type: Number,
  },
});

foodSchema.pre("save", function (next) {
  const totalScore = this.comments.reduce(
    (sum, comment) => sum + comment.score,
    0
  );
  this.averageScore = totalScore / this.comments.length;
  next();
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
