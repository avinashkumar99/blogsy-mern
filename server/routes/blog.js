const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/userController");
const { authenticateToken } = require("../middlewares");
const {
  fetchPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/blogController");

router.get("/post/:id", fetchPost);
router.post("/post/create", authenticateToken, createPost);
router.delete("/post/delete/:id", authenticateToken, deletePost);
router.patch("/post/update/:id", authenticateToken, updatePost);

module.exports = router;
