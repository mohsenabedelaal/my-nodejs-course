const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 5 * 24 * 60 * 60;
const createJWT = (id) => {
  return jwt.sign({ id }, "chatroom secret", {
    expiresIn: maxAge, //in sec
  });
};
const alertError = (err) => {
  let errors = { name: "", email: "", password: "" };
  // console.log(`error code : ${err.code}`);
  // console.log(`error message : ${err.message}`);
  if (err.message === "incorrect email") {
    errors.email = "This email is not found";
  }
  if (err.message === "incorrect password") {
    errors.password = "Please put the correct credentials";
  }
  if (err.code === 11000) {
    errors.email = "this email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
  //   console.log(`error code : ${err.code}`);
  //   console.log(`error message : ${err.message}`);
  //   console.log(err);
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(req.body);
  try {
    const user = await User.create({ name, email, password });
    const token = createJWT(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, //in msec
    });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, //in msec
    });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};

module.exports.verifyuser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "chatroom secret", async (err, decodedToken) => {
      console.log("decoded token", decodedToken);
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports.logout = (req, res) => {
  console.log("hello");
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ logout: true });
};
