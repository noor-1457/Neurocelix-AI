const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
