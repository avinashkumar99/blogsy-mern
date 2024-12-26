const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

module.exports.fetchPost = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const post = await Blog.findById(id);
    // console.log(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error!", error: e });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const user = req.user;
    const { title, content, tag, img, createdAt, updatedAt } = req.body;
    // console.log(title, content, tag, img);

    // console.log(user);
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new Blog({
      title,
      content,
      tag,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      author: userData._id,
      likes: 0,
      img,
    });
    const savedData = await newPost.save();
    // console.log(savedData);
    if (!savedData) {
      return res.status(500).json({ message: "Database error!" });
    }
    res.status(200).json({ message: "Post created Successfully!" });
    // console.log(userData);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "NO ID" });
    }
    const deletedPost = await Blog.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    return res.status(200).json({ message: "post deleted!" });
  } catch (e) {
    console.error("Error : ", e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "Unauthorized access, Not author!" });
    }
    const { title, tag, updatedAt, content, img } = req.body;
    const updateField = {};
    console.log("id comming from update route", id);

    if (!id) {
      return res.status(400).json({ message: "Bad resquest, invalid post id" });
    }
    if (title) updateField.title = title;
    if (tag) updateField.tag = tag;
    if (content) updateField.content = content;
    if (img && img.length !== 0) updateField.img = img;
    updateField.updatedAt = Date.now();
    const updatedPost = await Blog.findOneAndUpdate(
      { _id: id },
      { $set: updateField },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post does not exist!" });
    }
    res.status(200).json({ message: "Updated successfully!" });
  } catch (e) {
    console.error("error : ", e);
    return res
      .status(500)
      .json({ message: "Internal server error!", error: e });
  }
};
