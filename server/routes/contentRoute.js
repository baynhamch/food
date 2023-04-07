const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Food = require("../models/Food");
const mongoose = require("mongoose");

router.put("/save", async (req, res) => {
  const { token } = req.cookies;
  const { favorite, foodId, userId } = req.body;

  const userDoc = await User.findById(userId);
  const foodDoc = await Food.findById(foodId);
  if (favorite) {
    await userDoc.updateOne({
      $push: { favorite: foodId },
    });
  }
  if (!favorite) {
    await userDoc.updateOne({
      $pull: { favorite: foodId },
    });
  }

  res.json(userDoc);
});

module.exports = router;
