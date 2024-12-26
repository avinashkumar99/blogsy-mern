const express = require("express");
const router = express.Router();
const {
  loginUser,
  fetchAuthor,
  newUser,
  postOwner,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares");

router.post("/login", loginUser);
router.get("/author/:id", fetchAuthor);
router.post("/create", newUser);
router.get("/get-user/:id", authenticateToken, postOwner);

module.exports = router;
