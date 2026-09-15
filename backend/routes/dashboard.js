const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Service = require('../models/Service');
const CaseStudy = require('../models/CaseStudy');

router.get('/stats', auth, async (req, res) => {
  try {
    const [users, blogs, contacts, services, caseStudies] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Service.countDocuments(),
      CaseStudy.countDocuments()
    ]);
    // Mock revenue data
    const revenue = [
      { month: 'Jan', revenue: 12000 }, { month: 'Feb', revenue: 19000 },
      { month: 'Mar', revenue: 15000 }, { month: 'Apr', revenue: 25000 },
      { month: 'May', revenue: 22000 }, { month: 'Jun', revenue: 30000 },
      { month: 'Jul', revenue: 28000 }, { month: 'Aug', revenue: 35000 },
    ];
    const analytics = [
      { day: 'Mon', visits: 400 }, { day: 'Tue', visits: 600 },
      { day: 'Wed', visits: 550 }, { day: 'Thu', visits: 800 },
      { day: 'Fri', visits: 750 }, { day: 'Sat', visits: 900 },
      { day: 'Sun', visits: 1000 },
    ];
    res.json({ users, blogs, contacts, services, caseStudies, revenue, analytics });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
