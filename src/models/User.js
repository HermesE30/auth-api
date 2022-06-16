const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required'],
    validate: (value) => {
      if (!isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  age: {
    type: Number,
    validate: (value) => {
      if (value < 0) {
        throw new Error(
          'Age must be a positive number'
        )
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    validate: (value) => {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
})

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

UserSchema.statics.findByCredentials = async function (credentials) {
  const { email, password } = credentials;

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
}

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  user.save();

  return token;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;

