const router = require('express').Router();
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/auth');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const filter = { isPublished: true };
    if (category && category !== 'all') filter.category = category;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select('-comments')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ success: true, data: blogs, total, pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Get single blog
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Add comment
router.post('/:slug/comments', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    if (!name || !email || !content) return res.status(400).json({ success: false, message: 'All fields required' });
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.comments.push({ name, email, content });
    await blog.save();
    res.status(201).json({ success: true, message: 'Comment added' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Create blog (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id, authorName: req.user.name });
    res.status(201).json({ success: true, data: blog });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Update blog (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: blog });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Delete blog (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
