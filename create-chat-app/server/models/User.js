const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Duplicate"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "The password should be at least 6 characters"],
    },
  },
  { timestamps: true }
);
// Mongoose Hooks (before save pre, after save post , validate ....) check it in the documentation of mongoose hooks
userSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt();
  this.password = await bycrypt.hash(this.password, salt);
  // console.log("before save", this);
  next();
});

// userSchema.post("save", function (doc, next) {
//   console.log("after save", doc);
//   next();
// });

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await bycrypt.compare(password, user.password);
    if (isAuthenticated) {
      return user;
    }
    throw Error("incorrect password");
  } else {
    throw Error("incorrect email");
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
