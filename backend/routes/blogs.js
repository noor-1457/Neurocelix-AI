const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// ─── Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // uploads folder me save hoga
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ─── Get all blogs
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search)
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Create blog with image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.image = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Update blog with image
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.image = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── Add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { name, email, comment, content } = req.body;

    blog.comments.push({
      name,
      email,
      comment: comment || content, // fallback
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;