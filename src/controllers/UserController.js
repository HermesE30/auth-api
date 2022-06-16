const User = require("../models/User");

const list = async (req, res) => {
  const users = await User.find({});
  res.json(users);
}

module.exports = {
  list,
};