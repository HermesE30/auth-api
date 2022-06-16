
const res = require("express/lib/response");
const User = require("../models/User");

const list = async (request, response) => {
  const users = await User.find({});
  response.send(users);
}

const find = async (request, response) => {
  const { user } = request;
  response.send(user);
}

const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findByCredentials({ email, password });
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    console.log(error);
    response.status(403).send(error);
  }
};

const logout = async (request, response) => {
  try {
    const { user, token } = request;
    user.tokens = user.tokens.filter(t => t.token !== token);
    await user.save();
    response.send()
  } catch (error) {
    response.status(401).send({ error: "Unauthorized" });
  }
}

const logoutAll = async (request, response) => {
  try {
    const { user } = request;
    user.tokens = [];
    await user.save();
    response.send()
  } catch (error) {
    response.status(401).send({ error: "Unauthorized" });
  }
}

const create = async (request, response) => {
  try {
    const { body } = request;
    const user = new User(body);
    await user.save();
    response.status(201).send(user);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }

}

const remove = async (request, response) => {
  try {
    const { _id } = request.user;
    await User.findByIdAndRemove(_id);
    response.status(200).send();
  } catch (error) {
    response.status(500).send({ error: "Internal server error!" });
  }
}

const edit = async (request, response) => {
  try {
    const { body } = request;
    const { user } = request;
    Object.assign(user, body);
    await user.save();
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

module.exports = {
  list, find, create, remove, edit, login, logout, logoutAll
}