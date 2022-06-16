const express = require('express');
const {
  list,
  find,
  create,
  remove,
  edit,
  login,
  logout,
  logoutAll,
} = require('../controllers/UserController');
const { isValidUserBody, auth } = require('../middleware/users.middleware');

const users_routes = express.Router();

users_routes.get('/', auth, list);
users_routes.get('/me', auth, find);
users_routes.post('/', create);
users_routes.delete('/me', auth, remove)
users_routes.put('/me', isValidUserBody, auth, edit)
users_routes.post('/login', isValidUserBody, login)
users_routes.post('/logout', auth, logout);
users_routes.post('/logout_all', auth, logoutAll);
module.exports = users_routes;