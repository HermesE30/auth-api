const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
}

const isValidUserBody = (req, res, next) => {
  let validFields = ['name', 'email', 'password', 'age'];

  Object.keys(req.body).forEach(field => {
    if (!validFields.includes(field)) {
      res.status(400).send({ error: `${field} is not a valid field.` });
    }

    if (req.body[field] === undefined) {
      res.status(400).send({ error: `${field} is required.` });
    }
  }
  );
  next();
};

module.exports = { auth, isValidUserBody };