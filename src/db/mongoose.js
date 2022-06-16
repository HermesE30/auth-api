const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/test';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});