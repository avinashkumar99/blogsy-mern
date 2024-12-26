const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credential" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.emailId,
      },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      name: user.name,
      profileImg: user.profileImg,
    });
  } catch (e) {
    res.status(500).json({ e: "Failed to login" });
  }
};

module.exports.fetchAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await User.findById(id);
    console.log(author.name, "author name ");
    if (!author) {
      return res
        .status(404)
        .json({ message: "Author with this id not found!" });
    }
    res.status(200).json({ name: author.name, profileImg: author.profileImg });
  } catch (e) {
    console.error("Error while fetching: ", e);
    res.status(500).json({ message: "Internal server error ", error: e });
  }
};

module.exports.newUser = async (req, res) => {
  try {
    const { name, age, gender, emailId, bio, password, profileImg } = req.body;
    console.log(name, age, gender, emailId, bio, profileImg);
    const newUser = new User({
      name,
      age,
      gender,
      emailId,
      bio,
      password,
      profileImg,
    });
    const values = Object.values(newUser);
    const hasNullOrUndefined = values.some(
      (value) => value === null || value === undefined
    );
    if (hasNullOrUndefined) {
      return res.status(400).json({ message: "Something is missing!" });
    }

    const result = await newUser.save();
    if (!result) {
      return res.status(400).json({ message: "Could not save the data" });
    }
    res.status(200).json({ message: "Data saved!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error!", error: e });
  }
};

module.exports.postOwner = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    console.log("user from postowner", user);
    if (!user) {
      return res.status(404).json({ message: "Not Logged In!" });
    }
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: "user not found!" });
    }
    if (userData._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Different Post Owner", isOwner: false });
    }
    res.status(200).json({ message: "user found!", isOwner: true });
  } catch (e) {
    console.error("error: ", e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
