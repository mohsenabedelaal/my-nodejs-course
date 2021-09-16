const User = require("../models/User");

const alertError = (err) => {
  let errors = { name: "", email: "", password: "" };
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
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};
module.exports.login = (req, res) => {
  res.send("login");
};
module.exports.logout = (req, res) => {
  res.send("logout");
};
