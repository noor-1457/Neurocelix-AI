const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/services', require('./routes/services'));
app.use('/api/casestudies', require('./routes/caseStudies'));
app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/faq', require('./routes/faq'));
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Codecelix API Running' }));

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
