const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  console.log("pre middleware is working for password");

  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("save", function (next) {
  console.log("pre middleware is working for image");
  console.log(this.profileImg);
  if (this.profileImg === null || this.profileImg === undefined) {
    this.profileImg =
      this.gender === "male"
        ? "https://img.freepik.com/premium-photo/3d-animation-cartoon-character_113255-1260.jpg?w=996"
        : "https://cdn.openart.ai/published/7nhUJrCSehawaMFW9fvZ/wPnwaY0T_g59B_1024.webp";
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
