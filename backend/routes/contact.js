const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try { res.status(201).json(await Contact.create(req.body)); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try { res.json(await Contact.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try { res.json(await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
