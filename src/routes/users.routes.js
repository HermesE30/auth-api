const express = require('express');
const {
  list,
  create,
} = require('../controllers/UserController');
const { auth } = require('../middleware/users.middleware');

const users_routes = express.Router();

users_routes.get('/', auth, list);
users_routes.post('/', create);

module.exports = users_routes;