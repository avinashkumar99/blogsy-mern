const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blogModel");
const cors = require("cors");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const port = process.env.PORT || 8080;
const s3Service = require("./services/aws_s3");
const authenticateToken = require("./middlewares");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// console.log(authenticateToken);
const storage = multer.memoryStorage();
const upload = multer({ storage });
const mongourl = process.env.MONGOURI || "mongodb://127.0.0.1:27017/blogsdb";

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect(mongourl)
  .then(() => console.log("Connected to database."))
  .catch((e) => console.log("error while conneting to db: ", e));

// upload images route
const s3 = new S3Client({ region: process.env.AWS_REGION });

// Multer configuration

app.post("/api/upload/image", upload.single("profileImg"), async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded!" });
    }

    const fileName = `profiles/${Date.now()}-${req.file.originalname}`;
    console.log("filename : ", fileName);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResponse = await s3.send(new PutObjectCommand(params));
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    console.log(uploadResponse);
    res.status(200).json({ message: "Uploaded successfully!", imageUrl });
  } catch (e) {
    console.error("Error uploading file:", e);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// blog routes
app.get("/api/posts", async function (req, res) {
  try {
    const posts = await Blog.find({});
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("error while fetching posts: ", error);
    res.status(500).json({ message: "error fetching posts." });
  }
});

// user routes
app.use("/api/user", userRoutes);
app.use("/api", blogRoutes);
app.listen(port, () => {
  console.log("server is listening on port 8080");
});
