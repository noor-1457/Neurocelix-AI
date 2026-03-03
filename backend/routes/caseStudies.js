const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    res.json(await CaseStudy.find(query).sort({ createdAt: -1 }));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const cs = await CaseStudy.findById(req.params.id);
    if (!cs) return res.status(404).json({ message: 'Case study not found' });
    res.json(cs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try { res.status(201).json(await CaseStudy.create(req.body)); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try { res.json(await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try { await CaseStudy.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
