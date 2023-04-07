const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/Users");
const Food = require("./models/Food");
const Restaurant = require("./models/Restaurant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { json } = require("body-parser");
const searchRoute = require("./routes/searchRoute");
// const session = require("express-session");
// const { sign } = require("crypto");
const session = require("express-session");
const app = express();

const salt = bcrypt.genSaltSync(10);

const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(
    "mongodb+srv://nicholasch24:hunter1224@cluster0.uuyxsu9.mongodb.net/foodapp"
  )
  .catch((err) => console.log(err));
const secret = "asdfjk321n4kl123jkln413JJ";

const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRoute");
const { search } = require("./routes/searchRoute");
const contentRoute = require("./routes/contentRoute");
app.use(contentRoute);

app.use(authRouter);
// app.use("/search", searchRoute);
// app.use("/profile", userRouter);

app.use(searchRoute);

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userDoc = await User.findById(id);
    const favFoods = await Food.find({ _id: { $in: userDoc.favorite } });
    // const reveiwFoods = await Food.find({username: });
    res.json({ user: userDoc, favFoods: favFoods });
  } catch (error) {
    console.error(error);
  }
});

app.put("/profile", uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    const { id, username, email, file, location, bio, phoneNumber, favorite } =
      req.body;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const userDoc = await User.findById(id);
      if (!userDoc) {
        return res.status(404).json("User not found");
      }

      if (userDoc.id !== info.id) {
        return res
          .status(400)
          .json("You are not authorized to perform this action");
      }

      await userDoc.updateOne({
        id,
        username,
        email,
        file,
        location,
        bio,
        phoneNumber,
        favorite,
        avatar: newPath ? newPath : userDoc.avatar,
      });

      res.json(userDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while updating user profile");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/addFood", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { dish, restaurant, rating, price, category, summary } = req.body;
  try {
    const foodDoc = await Food.create({
      dish,
      restaurant,
      cover: newPath,
      rating,
      price,
      category,
      summary,
    });

    const resDoc = await Restaurant.findOne({ title: restaurant });
    if (!resDoc) {
      console.log("Created new Document");
      const newRestaurant = new Restaurant({ title: restaurant });
      await newRestaurant.save();
    } else {
      console.log("found");
      const newItem = await Food.findOneAndUpdate(
        { dish },
        { $set: { restaurantId: resDoc._id } }
      );
    }
  } catch (error) {
    console.log(error);
  }

  // res.json({ ext });
});
app.post(
  "/addrestaurant",
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { title, address, website, menu, phoneNumber } = req.body;
    // res.json(req.body);
    try {
      const restaurantDoc = await Restaurant.create({
        title,
        address,
        website,
        menu,
        phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

app.get("/post", uploadMiddleware.single("file"), async (req, res) => {
  res.json(await Food.find().populate().sort({ createdAt: -1 }).limit(20));
});

app.get("/food/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foodDoc = await Food.findById(id);

    res.json(foodDoc);
  } catch (error) {
    console.log(error);
  }
});

app.put("/food/:id", async (req, res) => {
  const { id } = req.params;
  const { username, review, score } = req.body;
  const foodDoc = await Food.findById(id);

  await foodDoc.updateOne(
    {
      $push: {
        comments: {
          username,
          comment: review,
          score,
        },
      },
    },
    { new: true }
  );

  res.json(foodDoc);

  //Retrieve first comment -------------
  const doc = await Food.findById(id);
  // console.log(doc.comments[0].score);
  const comments = doc.comments;
  const totalScore = comments.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = totalScore / comments.length;
  const newItem = await doc.updateOne({
    $set: { averageScore: averageScore },
  });
});

app.put("/food/media/:id", async (req, res) => {
  const { id } = req.params;
  const { publicationName, blerb, mediaLink } = req.body;
  const foodDoc = await Food.findById(id);

  await foodDoc.updateOne(
    {
      $push: {
        media: {
          publicationName,
          blerb,
          mediaLink,
        },
      },
    },
    { new: true }
  );
  res.json(publicationName, blerb, mediaLink);
});

app.get("/restaurant", async (req, res) => {
  res.json(
    await Restaurant.find().populate().sort({ createdAt: -1 }).limit(20)
  );
});

app.get("/restaurant/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resDoc = await Restaurant.findById(id);
    const foodDocs = await Food.find({ restaurant: resDoc.title });

    res.json([resDoc, foodDocs]);
  } catch (error) {
    console.log(error);
  }
});

app.put("/restaurant", async (req, res) => {
  // const { id } = req.params;
  const { title, menu, website, cover, phoneNumber, address, id } = req.body;
  const resDoc = await Restaurant.findById(id);

  await resDoc.updateOne({ title, menu, website, phoneNumber, address });
  res.json(resDoc);
  console.log(menu);
});

// app.get("/profile/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.log("Invalid user id:", id);
//       return res.status(400).json({ error: "Invalid user id" });
//     }

//     const userDoc = await User.findById(id)
//       .then((user) => {
//         if (!user) {
//           console.log("User not found");
//           return res.status(404).json({ error: "User not found" });
//         } else {
//           console.log("User found:", user);
//           return user;
//         }
//       })
//       .catch((error) => {
//         console.error("Error finding user:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       });

//     res.json(userDoc);
//   } catch (error) {
//     console.error({ "heres the error": error });
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

/////////////////////////////////////////////////////////////////////////

// app.put("/profile", uploadMiddleware.single("file"), async (req, res) => {
//   try {
//     let newPath = null;
//     if (req.file) {
//       const { originalname, path } = req.file;
//       const parts = originalname.split(".");
//       const ext = parts[parts.length - 1];
//       newPath = path + "." + ext;
//       fs.renameSync(path, newPath);
//     }

//     const { token } = req.cookies;
//     const { id, username, email, file, location, bio, phoneNumber } = req.body;

//     jwt.verify(token, secret, {}, async (err, info) => {
//       if (err) throw err;

//       const userDoc = await User.findById(id);
//       if (!userDoc) {
//         return res.status(404).json("User not found");
//       }

//       if (userDoc.id !== info.id) {
//         return res
//           .status(400)
//           .json("You are not authorized to perform this action");
//       }

//       await userDoc.updateOne({
//         id,
//         username,
//         email,
//         file,
//         location,
//         bio,
//         phoneNumber,
//         avatar: newPath ? newPath : userDoc.avatar,
//       });

//       res.json(userDoc);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json("An error occurred while updating user profile");
//   }
// });
/////////////////////////////////////////////////////////////////////////
//   let newPath = null;

//   if (req.file) {
//     const { originalname, path } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//   }
//   // res.json(newPath);
//   const { id, username, email, file, location, bio, phoneNumber } = req.body;
//   console.log(newPath);
//   const userDoc = await User.findById(id);
//   res.json(req.files);

//   res.json(userDoc);
// });

// app.put("/profile/:id", (req, res) => {
//   // const { id } = req.params;
//   // res.json(id);
//   const { id } = req.params;
//   const userDoc = User.findById(id);
//   res.json(userDoc);
// });
///////////////////////////////////////////////////////////////////////////

app.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
///////////////////////////////////////////////////////////////////////////
// app.post("/search", (req, res) => {
//   search = req.body;
//   //   res.json(search);
//   const query = { $text: { $search: search } };
//   const curson = Food.find(query);
//   res.json(curson);
// });

app.listen(3050);
