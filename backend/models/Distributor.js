const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const DistributorSchema = new Schema({
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
  shipList: [{
    type: Schema.Types.ObjectId,
    ref: 'Shipping',
  }],
}, {
  timestamps: true,
});

/* eslint-disable */
DistributorSchema.pre('save', function (next) {
  try {
    let distributor = this;
    if (!distributor.isModified('password')) return next();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(distributor.password, salt);
    distributor.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

DistributorSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Distributor', DistributorSchema);
