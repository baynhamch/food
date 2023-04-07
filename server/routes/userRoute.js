const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const multer = require("multer");
const secret = "asdfjk321n4kl123jkln413JJ";
const uploadMiddleware = multer({ dest: "uploads/" });
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use("/uploads", express.static(__dirname + "/uploads"));

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  res.json(req.cookies);
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

router.put("/profile", uploadMiddleware.single("file"), async (req, res) => {
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
    const { id, username, email, file, location, bio, phoneNumber } = req.body;

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
        avatar: newPath ? newPath : userDoc.avatar,
      });

      res.json(userDoc);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while updating user profile");
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user id:", id);
      return res.status(400).json({ error: "Invalid user id" });
    }

    const userDoc = await User.findById(id)
      .then((user) => {
        if (!user) {
          console.log("User not found");
          return res.status(404).json({ error: "User not found" });
        } else {
          console.log("User found:", user);
          return user;
        }
      })
      .catch((error) => {
        console.error("Error finding user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      });

    res.json(userDoc);
  } catch (error) {
    console.error({ "heres the error": error });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
