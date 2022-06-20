const express = require('express');
const cors = require('cors');
const users_routes = require('./routes/users.routes');
const version = 'v1';

const app = express();
app.use(cors());

app.use(express.json());

app.use(`/users`, users_routes);

app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;