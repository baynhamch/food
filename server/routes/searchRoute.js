// const express = require("express");
// const router = express.Router();

// router.post("/search", (req, res) => {
//   res.json(req.body);
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Food = require("../models/Food");

// router.post("/search", async (req, res) => {
//   // res.json(req.body);

//   try {
//     const query = req.body;
//     const searchFood = await Food.find(
//       // { dish: query }
//       {
//         $or: [
//           { dish: { $regex: query, $options: "i" } },
//           { restaurant: { $regex: query, $options: "i" } },
//         ],
//       }
//     );
//     res.json(searchFood);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error searching the collection" });
//   }
// });
router.post("/search", async (req, res) => {
  const query = req.body.search;
  // res.json(query);
  console.log(query);
  // const results = await Food.find({ dish: query });
  const results = await Food.find({
    $or: [
      { dish: { $regex: query, $options: "i" } },
      { restaurant: { $regex: query, $options: "i" } },
    ],
  });
  res.json(results);
  // try {
  //   const results = await Food.find({ $text: { $search: query } });
  //   res.json(results);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: "Internal server error" });
  // }
});

module.exports = router;
