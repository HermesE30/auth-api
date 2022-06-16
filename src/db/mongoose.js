const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/test';

console.log(`Connecting to MongoDB at ${MONGO_URI}`);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});