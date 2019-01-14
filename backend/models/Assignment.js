const mongoose = require('mongoose');

const { Schema } = mongoose;

const AssignmentSchema = new Schema({
  distributor: {
    type: Schema.Types.ObjectId,
    ref: 'Distributor',
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
