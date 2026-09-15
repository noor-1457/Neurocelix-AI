const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  client: { type: String },
  results: [String],
  images: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
