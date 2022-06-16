const User = require("../models/User");

const list = async (req, res) => {
  const users = await User.find({});
  res.json(users);
}

const create = async (req, res) => {
  try {
    const { body } = req;
    const user = new User(body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  list,
  create,
};