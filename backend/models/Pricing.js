const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthlyPrice: { type: Number, required: true },
  yearlyPrice: { type: Number, required: true },
  features: [String],
  highlighted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pricing', pricingSchema);
