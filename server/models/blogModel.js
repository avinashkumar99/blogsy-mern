const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tag: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  likes: {
    type: Number,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  img: [
    {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
  ],
});

blogSchema.pre("save", function (next) {
  console.log("Incoming image from frontend:", this.img);
  if (!this.img || this.img.length === 0) {
    this.img.push("https://www.testo.com/images/not-available.jpg");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
