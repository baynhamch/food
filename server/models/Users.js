const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true, min: 5 },
  avatar: String,
  admin: Boolean,
  location: String,
  bio: String,
  phoneNumber: String,
  favorite: [{ type: Schema.Types.ObjectId, ref: "Food" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
