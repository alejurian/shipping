const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShippingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  chargeId: {
    type: String,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping',
  },
  distributor: {
    type: Schema.Types.ObjectId,
    ref: 'Distributor',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Shipping', ShippingSchema);
