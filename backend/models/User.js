const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

/* eslint-disable */
UserSchema.pre('save', function (next) {
  try {
    let user = this;
    if (!user.isModified('password')) return next();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);
