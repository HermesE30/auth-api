const express = require('express');
const { list } = require('../controllers/UserController');
const { auth } = require('../middleware/users.middleware');

const users_routes = express.Router();

users_routes.get('/', auth, list);

module.exports = users_routes;